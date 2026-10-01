import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AreaScene from "@/components/AreaScene";
import JsonLd from "@/components/JsonLd";
import SearchDirectory from "@/components/SearchDirectory";
import { areas, getAreaRecords, neighborhoods, siteUrl } from "@/lib/data";

export function generateStaticParams() {
  return areas.map(area => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find(item => item.slug === slug);
  if (!area) return {};
  return {
    title: `دليل ${area.name}`,
    description: `${area.description} تصفح الأنشطة والخدمات الموثقة في ${area.name} - مركز الوقف، قنا.`,
    alternates: { canonical: `/areas/${slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const areaIndex = areas.findIndex(item => item.slug === slug);
  if (areaIndex === -1) notFound();
  const area = areas[areaIndex];
  const records = getAreaRecords(slug);
  const categoryCounts = new Map<string, number>();
  for (const record of records) categoryCounts.set(record.category, (categoryCounts.get(record.category) ?? 0) + 1);
  const topCategories = [...categoryCounts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ar")).slice(0, 4);

  return <section className="page-shell area-chapter-page"><div className="shell">
    <nav className="chapter-breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><span>{area.name}</span></nav>
    <div className={`area-page-hero chapter-hero chapter-${slug}`}>
      <div className="chapter-copy">
        <span className="chapter-overline"><span className="chapter-sigil" aria-hidden="true">✦</span> دليل مركز الوقف <span aria-hidden="true">/</span> {area.accent}</span>
        <span className="section-kicker">{area.kicker}</span>
        <h1>{area.name}</h1>
        <p>{area.description}</p>
        <div className="area-stats"><span><b>{records.length}</b> سجل جاهز للنشر</span><span><b>{categoryCounts.size}</b> فئة في الدليل</span></div>
      </div>
      <div className="chapter-visual" aria-hidden="true"><span className="chapter-orbit chapter-orbit-one"/><span className="chapter-orbit chapter-orbit-two"/><span className="chapter-visual-label">مشهد تعبيري من الدليل</span><AreaScene kind={area.slug}/><span className="chapter-folio">{String(areaIndex + 1).padStart(2, "0")} <i>/</i> {String(areas.length).padStart(2, "0")}</span></div>
      <div className="chapter-foot"><span>من المركز إلى المكان</span><span>تصفّح الخدمات والأنشطة حسب الفئة <span aria-hidden="true">↙</span></span></div>
    </div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: area.name, url: `${siteUrl}/areas/${slug}` }}/>
    {topCategories.length ? <section className="chapter-categories" aria-labelledby="chapter-categories-title"><div className="chapter-section-title"><div><span className="section-kicker">أقرب طريق لما تبحث عنه</span><h2 id="chapter-categories-title">ابدأ من <em>فئة</em></h2></div><span>أبرز الفئات المتاحة في {area.name}</span></div><div className="chapter-category-grid">{topCategories.map(([name, count], index) => <Link key={name} href={`/areas/${slug}?category=${encodeURIComponent(name)}#directory-results`} className="chapter-category"><span className="chapter-category-number">{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><span className="chapter-category-meta">{count} {count === 1 ? "سجل" : "سجلات"}<span aria-hidden="true">↙</span></span></Link>)}</div></section> : null}
    {slug === "alwaqf" ? <section className="chapter-neighborhoods" aria-labelledby="chapter-neighborhoods-title"><div><span className="section-kicker">داخل المدينة</span><h2 id="chapter-neighborhoods-title">الأحياء والتجمعات</h2></div><nav aria-label="أحياء مدينة الوقف" className="neighborhood-links">{neighborhoods.map(n => <Link key={n.slug} href={`/neighborhoods/${n.slug}`}>{n.name}<span aria-hidden="true">↗</span></Link>)}</nav></section> : null}
    <div className="chapter-directory-heading"><span className="section-kicker">كل السجلات الجاهزة</span><h2>استكشف دليل {area.name}</h2></div>
    <SearchDirectory records={records}/>
  </div></section>;
}
