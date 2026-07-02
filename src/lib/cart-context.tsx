"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DELIVERY_FEE,
  TAX_RATE,
  type Product,
  type ProductSize,
  getProductById,
} from "./products";

export interface CartItem {
  key: string;
  productId: string;
  size: ProductSize;
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  orderMessage: string;
  orderPlaced: boolean;
  addItem: (productId: string, size: ProductSize, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setOrderMessage: (msg: string) => void;
  placeOrder: () => void;
  getLinePrice: (item: CartItem) => number;
  getLineDetails: (item: CartItem) => {
    product: Product;
    sizeLabel: string;
    weight: string;
    unitPrice: number;
    lineTotal: number;
  } | null;
  summary: OrderSummary;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const getLineDetails = useCallback((item: CartItem) => {
    const product = getProductById(item.productId);
    if (!product) return null;
    const sizeOpt = product.sizes.find((s) => s.id === item.size);
    if (!sizeOpt) return null;
    return {
      product,
      sizeLabel: sizeOpt.label,
      weight: sizeOpt.weight,
      unitPrice: sizeOpt.price,
      lineTotal: sizeOpt.price * item.quantity,
    };
  }, []);

  const getLinePrice = useCallback(
    (item: CartItem) => getLineDetails(item)?.lineTotal ?? 0,
    [getLineDetails],
  );

  const addItem = useCallback((productId: string, size: ProductSize, qty = 1) => {
    const key = `${productId}-${size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { key, productId, size, quantity: qty }];
    });
    setIsOpen(true);
    setOrderPlaced(false);
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const placeOrder = useCallback(() => {
    if (items.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      setItems([]);
      setOrderMessage("");
      setOrderPlaced(false);
      setIsOpen(false);
    }, 5000);
  }, [items.length]);

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + getLinePrice(item), 0);
    const delivery = items.length > 0 ? DELIVERY_FEE : 0;
    const tax = (subtotal + delivery) * TAX_RATE;
    const total = subtotal + delivery + tax;
    return { subtotal, tax, delivery, total };
  }, [items, getLinePrice]);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      orderMessage,
      orderPlaced,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setOrderMessage,
      placeOrder,
      getLinePrice,
      getLineDetails,
      summary,
      itemCount,
    }),
    [
      items,
      isOpen,
      orderMessage,
      orderPlaced,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      placeOrder,
      getLinePrice,
      getLineDetails,
      summary,
      itemCount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
