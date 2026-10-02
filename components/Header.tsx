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
        <form className="header-search" role="search" action="/directory" method="get">
          <SearchIcon className="header-search-icon" aria-hidden="true" />
          <input type="search" name="q" maxLength={120} aria-label="ابحث في دليل الوقف" placeholder="ابحث هنا…" enterKeyHint="search" />
          <button type="submit" aria-label="عرض نتائج البحث"><span className="header-search-submit-text">ابحث</span><span className="header-search-submit-arrow" aria-hidden="true">↙</span><SearchIcon className="header-search-submit-icon" aria-hidden="true" /></button>
        </form>
      </div>
    </header><MobileNavigation /></>
  );
}
