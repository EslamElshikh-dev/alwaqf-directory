import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SearchDirectory from "@/components/SearchDirectory";
import { SearchIcon } from "@/components/Icons";
import { areas, getAreaRecords, getSearchableLocalityOptions, publicRecords } from "@/lib/data";
import { placeArtSrc } from "@/lib/artwork";

export const metadata: Metadata = { title: "دليل الأنشطة والخدمات", description: "ابحث في الأنشطة والخدمات الموثقة داخل مركز الوقف بمحافظة قنا.", alternates: { canonical: "/directory" } };

export default function DirectoryPage() {
  const categoriesCount = new Set(publicRecords.map(record => record.category)).size;
  const highlightIds = ["WK-001", "MR-060", "QL-001", "CH-006", "WK-078"];
  const highlights = highlightIds.flatMap(id => publicRecords.filter(record => record.id === id));

  return <section className="page-shell directory-page"><div className="shell">
    <nav className="chapter-breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><span>الدليل</span></nav>
    <div className="directory-stage">
      <div className="directory-stage-copy">
        <div className="directory-stage-overline"><span className="directory-stage-sigil" aria-hidden="true">✦</span><span>دليل الوقف</span><span aria-hidden="true">/</span><span>فهرس الخدمات</span></div>
        <span className="section-kicker">من اسم النشاط إلى عنوانه</span>
        <h1>كل الخدمات والأنشطة.<br/><em>في بحث واحد.</em></h1>
        <p>دوّر بالاسم أو الفئة أو المكان، واختصر الطريق إلى التفاصيل ومصدر كل سجل جاهز للنشر.</p>
        <a href="#directory-results" className="directory-stage-action"><SearchIcon /> ابدأ البحث <span aria-hidden="true">↙</span></a>
        <div className="directory-stage-stats"><div><b>{publicRecords.length}</b><span>سجل جاهز</span></div><div><b>{categoriesCount}</b><span>فئة</span></div><div><b>{areas.length}</b><span>مناطق</span></div></div>
      </div>
      <div className="directory-atlas"><div className="directory-atlas-head"><span>فهرس المكان</span><span>الوقف · قنا / ٠١</span></div><p>ابدأ من منطقة تعرفها</p><nav className="atlas-route-grid" aria-label="مناطق الدليل">{areas.map((area, index) => <Link href={`/areas/${area.slug}`} className={`atlas-route atlas-route-${index + 1}`} key={area.slug}><span className="atlas-route-index">{String(index + 1).padStart(2, "0")} / 04</span><strong>{area.name}</strong><span className="atlas-route-foot"><span><b>{getAreaRecords(area.slug).length}</b> سجل جاهز</span><span aria-hidden="true">↙</span></span></Link>)}</nav><span className="atlas-compass" aria-hidden="true">✦</span><div className="directory-atlas-foot"><span>اختر منطقة، أو ابحث في الدليل كله</span><span>رسم فهرسي تعبيري</span></div></div>
    </div>
    <section className="directory-gallery" aria-labelledby="directory-gallery-title">
      <div className="directory-gallery-heading"><div><span className="section-kicker">من المدينة إلى النجع</span><h2 id="directory-gallery-title">خمس محطات <em>تفتح الحكاية.</em></h2></div><p>نماذج من الخدمات والمعالم في مناطق مختلفة. المشاهد تصورات فنية، وتفاصيل كل سجل موثقة في صفحته.</p></div>
      <div className="directory-gallery-track">{highlights.map((record, index) => <Link href={`/place/${record.id}`} className="directory-gallery-card" key={record.id}>
        <span className="directory-gallery-photo"><Image src={placeArtSrc(record.id)} width={600} height={400} alt="" sizes="(max-width: 600px) 78vw, (max-width: 960px) 42vw, 20vw" unoptimized /><span className="directory-gallery-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="directory-gallery-disclaimer">تصور فني</span></span>
        <span className="directory-gallery-copy"><small>{record.batch_area} <span aria-hidden="true">/</span> {record.category}</small><strong>{record.name_ar}</strong><span className="directory-gallery-arrow" aria-hidden="true">↙</span></span>
      </Link>)}</div>
    </section>
    <div className="directory-search-heading"><div><span className="section-kicker">الآن دورك</span><h2>ابحث بطريقتك.</h2></div><p>اكتب كلمة، ثم ضيّق النتائج بالفئة أو القرية أو التجمع المحلي. تظهر هنا السجلات المكتملة والجاهزة للنشر فقط.</p></div>
    <SearchDirectory records={publicRecords} localityOptions={getSearchableLocalityOptions(publicRecords)} />
  </div></section>;
}
