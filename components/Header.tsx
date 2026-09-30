import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="دليل الوقف">
          <BrandMark />
          <span><b>دليل الوقف</b><small>دليل محلي موثّق لمحافظة قنا</small></span>
        </Link>
        <nav className="main-nav" aria-label="التنقل الرئيسي">
          <Link href="/directory">الدليل</Link>
          <Link href="/#areas">المناطق</Link>
          <Link href="/about">عن المشروع</Link>
        </nav>
        <Link href="/directory" className="header-cta">ابحث في الدليل</Link>
      </div>
    </header>
  );
}
