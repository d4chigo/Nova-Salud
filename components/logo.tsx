import Image from "next/image"

type LogoProps = {
  className?: string
  size?: "small" | "medium" | "large"
}

export function Logo({ className, size = "medium" }: LogoProps) {
  // Determinar el tamaño basado en la prop
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 48, height: 48 },
    large: { width: 120, height: 120 },
  }[size]

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`relative overflow-hidden rounded-full bg-white`}
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      >
        <Image
          src="/logo-farmacia.png"
          alt="Farmacia Nova Salud"
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain"
        />
      </div>
    </div>
  )
}
