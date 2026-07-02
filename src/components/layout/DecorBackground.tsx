import Image from "next/image";

interface DecorBackgroundProps {
  image: string;
  opacity?: number;
  overlayStrength?: "light" | "medium" | "soft";
  className?: string;
}

const overlayMap = {
  light: "from-cream/75 via-cream/65 to-cream/80",
  medium: "from-cream/60 via-cream/50 to-cream/65",
  soft: "from-cream/45 via-cream/35 to-cream/50",
};

export function DecorBackground({
  image,
  opacity = 0.38,
  overlayStrength = "medium",
  className = "",
}: DecorBackgroundProps) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 ${className}`} aria-hidden="true">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        style={{ opacity }}
        sizes="100vw"
        priority={false}
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayMap[overlayStrength]}`} />
    </div>
  );
}
