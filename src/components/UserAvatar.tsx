import Image from "next/image";

export function UserAvatar({ name, src, size = "md" }: { name: string; src?: string | null; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "lg" ? "h-24 w-24" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const textSize = size === "lg" ? "text-2xl" : "text-sm";
  const initial = name.trim().charAt(0).toUpperCase() || "P";

  return (
    <span className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-extrabold text-white ring-2 ring-white ${dimensions} ${textSize}`} aria-hidden="true">
      {src ? <Image src={src} alt="" fill sizes={size === "lg" ? "96px" : size === "sm" ? "36px" : "44px"} className="object-cover" unoptimized={src.startsWith("data:")} /> : initial}
    </span>
  );
}
