import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AreaScene from "@/components/AreaScene";
import SearchDirectory from "@/components/SearchDirectory";
import JsonLd from "@/components/JsonLd";
import { neighborhoods, getNeighborhoodRecords, siteUrl } from "@/lib/data";
export function generateStaticParams() {
  return neighborhoods.map(n => ({ slug: n.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = neighborhoods.find(item => item.slug === decodeURIComponent(slug));
  if (!n) return {};
  return {
    title: `دليل ${n.name}`,
    description: `استكشف الخدمات والأنشطة ذات العنوان المثبت في ${n.name} بمدينة الوقف، قنا.`,
    alternates: { canonical: `/neighborhoods/${encodeURIComponent(n.slug)}` },
  };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = neighborhoods.findIndex(item => item.slug === decodeURIComponent(slug));
  if (index === -1) notFound();
  const n = neighborhoods[index];
  const records = getNeighborhoodRecords(n.name);

  return <section className="page-shell area-chapter-page"><div className="shell">
    <nav className="chapter-breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><Link href="/areas/alwaqf">مدينة الوقف</Link><span aria-hidden="true">/</span><span>{n.name}</span></nav>
    <div className="area-page-hero chapter-hero neighborhood-chapter">
      <div className="chapter-copy">
        <span className="chapter-overline"><span className="chapter-sigil" aria-hidden="true">✦</span> دليل مركز الوقف <span aria-hidden="true">/</span> أحياء المدينة</span>
        <span className="section-kicker">من المدينة إلى الحي</span>
        <h1>{n.name}</h1>
        <p>الأنشطة والخدمات المرتبطة بعنوان واضح داخل {n.name}. وجود صفحة المنطقة لا يعني اكتمال حصر أنشطتها.</p>
        <div className="area-stats"><span><b>{records.length}</b> {records.length === 1 ? "سجل جاهز للنشر" : "سجلات جاهزة للنشر"}</span></div>
        <a className="chapter-source" href={n.evidence_url} target="_blank" rel="noreferrer">مصدر تعريف المنطقة <span aria-hidden="true">↗</span></a>
      </div>
      <div className="chapter-visual" aria-hidden="true"><span className="chapter-orbit chapter-orbit-one"/><span className="chapter-orbit chapter-orbit-two"/><span className="chapter-visual-label">داخل مدينة الوقف</span><AreaScene kind="alwaqf"/><span className="chapter-folio">{String(index + 1).padStart(2, "0")} <i>/</i> {String(neighborhoods.length).padStart(2, "0")}</span></div>
      <div className="chapter-foot"><span>مدينة الوقف <span aria-hidden="true">←</span> {n.name}</span><Link href="/areas/alwaqf">اكتشف المدينة <span aria-hidden="true">↙</span></Link></div>
    </div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: `دليل ${n.name}`, url: `${siteUrl}/neighborhoods/${encodeURIComponent(n.slug)}` }}/>
    {records.length ? <><div className="chapter-directory-heading"><span className="section-kicker">في هذا الحي</span><h2>استكشف الأنشطة والخدمات</h2></div><SearchDirectory records={records}/></> : <div className="empty-state"><h2>نستكمل بيانات هذه المنطقة</h2><p>لا توجد أنشطة جاهزة للنشر ومرتبطة بهذه المنطقة حاليًا.</p><Link href="/areas/alwaqf" className="primary-button">تصفح خدمات مدينة الوقف</Link></div>}
  </div></section>;
}
