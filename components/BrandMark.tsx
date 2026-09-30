import Image from "next/image";

export default function BrandMark({ className = "" }: { className?: string }) {
  return <span className={`brand-mark ${className}`} aria-hidden="true"><Image src="/logo.svg" alt="" width={160} height={160} /></span>;
}
