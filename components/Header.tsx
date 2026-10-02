import Link from "next/link";
import BrandMark from "./BrandMark";
import { SearchIcon } from "./Icons";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <><header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="دليل الوقف">
          <BrandMark />
          <span className="brand-copy"><b>دليل الوقف</b><small className="brand-desktop-caption">دليل محلي موثّق لمحافظة قنا</small><small className="brand-mobile-caption">قنا · مصر</small></span>
        </Link>
        <nav className="main-nav" aria-label="التنقل الرئيسي">
          <Link href="/directory">الدليل</Link>
          <Link href="/#areas">المناطق</Link>
          <Link href="/about">عن المشروع</Link>
        </nav>
        <Link href="/directory" className="header-cta"><SearchIcon className="header-search-icon" aria-hidden="true" /><span className="header-cta-long">ابحث في الدليل</span><span className="header-cta-short">بحث</span></Link>
      </div>
    </header><MobileNavigation /></>
  );
}
