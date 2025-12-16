import Link from "next/link";
import Image from "next/image";

interface IconeProps {
  src: string;
  alt: string;
  href: string;
}

export function Icone({ src, alt, href } : IconeProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-[#292929] px-5 py-2.5 transition-colors hover:bg-[#363636]"
    >
      <Image
        src={src}
        alt={alt}
        width={24}
        height={24}
      />
    </Link>
  );
}
