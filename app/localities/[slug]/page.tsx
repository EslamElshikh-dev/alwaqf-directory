import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NeighborhoodScene from "@/components/NeighborhoodScene";
import SearchDirectory from "@/components/SearchDirectory";
import JsonLd from "@/components/JsonLd";
import { areas, localities, getLocalityRecords, getSearchableLocalityOptions, siteUrl } from "@/lib/data";
export function generateStaticParams() {
  return localities.map(n => ({ slug: n.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = localities.find(item => item.slug === decodeURIComponent(slug));
  if (!n) return {};
  return {
    title: `دليل ${n.name}`,
    description: `استكشف الخدمات والأنشطة المرتبطة بعنوان في ${n.name}${n.aliases?.length ? `، المعروفة أيضًا باسم ${n.aliases.join("، ")}` : ""} بمركز الوقف، قنا، ومصادرها.`,
    alternates: { canonical: `/localities/${encodeURIComponent(n.slug)}` },
  };
}

export default async function LocalityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = localities.findIndex(item => item.slug === decodeURIComponent(slug));
  if (index === -1) notFound();
  const n = localities[index];
  const parent = areas.find(area => area.slug === n.parentArea)!;
  const records = getLocalityRecords(n.name, n.parentArea);
  const siblings = localities.filter(item => item.parentArea === n.parentArea);
  const siblingIndex = siblings.findIndex(item => item.slug === n.slug);
  const nextLocalities = [1, 2].map(offset => siblings[(siblingIndex + offset) % siblings.length]).filter(other => other.slug !== n.slug);

  return <section className="page-shell area-chapter-page"><div className="shell">
    <nav className="chapter-breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><Link href={`/areas/${parent.slug}`}>{parent.name}</Link><span aria-hidden="true">/</span><span>{n.name}</span></nav>
    <div className="area-page-hero chapter-hero neighborhood-chapter">
      <div className="chapter-copy">
        <span className="chapter-overline"><span className="chapter-sigil" aria-hidden="true">✦</span> دليل مركز الوقف <span aria-hidden="true">/</span> {parent.name}</span>
        <span className="section-kicker">{n.kind} · {parent.name}</span>
        <h1>{n.name}</h1>
        {n.aliases?.length ? <a className="locality-alias" href={n.aliasEvidenceUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">⌁</span> ورد أيضًا: {n.aliases.join("، ")} <span aria-hidden="true">↗</span></a> : null}
        <p>الأنشطة والخدمات المرتبطة بعنوان داخل {n.name}. وجود صفحة للتجمع لا يعني اكتمال حصر أنشطته أو تقرير حدوده الإدارية.</p>
        <div className="area-stats"><span><b>{records.length}</b> {records.length === 1 ? "سجل جاهز للنشر" : "سجلات جاهزة للنشر"}</span></div>
        {records.length > 0 && <a className="neighborhood-jump" href="#locality-directory">تصفح سجلات المكان <span aria-hidden="true">↙</span></a>}
        <a className="chapter-source" href={n.evidence_url} target="_blank" rel="noreferrer">راجع مصدر اسم المكان <span aria-hidden="true">↗</span></a>
      </div>
      <div className="chapter-visual" aria-hidden="true"><span className="chapter-orbit chapter-orbit-one"/><span className="chapter-orbit chapter-orbit-two"/><span className="chapter-visual-label">رسم تعبيري للتجمع</span><NeighborhoodScene index={index}/><span className="chapter-folio">{String(siblingIndex + 1).padStart(2, "0")} <i>/</i> {String(siblings.length).padStart(2, "0")}</span></div>
      <div className="chapter-foot"><span>{parent.name} <span aria-hidden="true">←</span> {n.name}</span><Link href={`/areas/${parent.slug}`}>اكتشف {parent.name} <span aria-hidden="true">↙</span></Link></div>
    </div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: `دليل ${n.name}`, url: `${siteUrl}/localities/${encodeURIComponent(n.slug)}`, isPartOf: {"@type": "Place", name: parent.name} }}/>
    {records.length ? <div id="locality-directory"><div className="chapter-directory-heading"><span className="section-kicker">في {n.name}</span><h2>استكشف الأنشطة والخدمات</h2></div><SearchDirectory records={records} localityOptions={getSearchableLocalityOptions(records)}/></div> : <div className="empty-state"><h2>نستكمل بيانات هذا المكان</h2><p>لا توجد أنشطة جاهزة للنشر ومرتبطة بهذا التجمع حاليًا.</p><Link href={`/areas/${parent.slug}`} className="primary-button">تصفح خدمات {parent.name}</Link></div>}
    <section className="neighborhood-next" aria-labelledby="neighborhood-next-title">
      <div className="neighborhood-next-heading"><span className="section-kicker">واصل الرحلة · {parent.name}</span><h2 id="neighborhood-next-title">مكان يقودك إلى مكان.</h2><p>استكشف التجمعات الأخرى والسجلات المرتبطة بعنوان واضح داخل {parent.name}.</p><Link className="neighborhood-next-all" href={`/areas/${parent.slug}`}>كل سجلات {parent.name} <span aria-hidden="true">↙</span></Link></div>
      <div className="neighborhood-next-links">{nextLocalities.map(other => {
        const otherIndex = localities.indexOf(other);
        const count = getLocalityRecords(other.name, other.parentArea).length;
        return <Link className="neighborhood-next-card" href={`/localities/${encodeURIComponent(other.slug)}`} key={other.slug}>
          <span className="neighborhood-next-art" aria-hidden="true"><NeighborhoodScene index={otherIndex}/><span className="neighborhood-next-number">{String(siblings.indexOf(other) + 1).padStart(2, "0")}</span></span>
          <span className="neighborhood-next-card-copy"><span className="neighborhood-next-overline">{other.kind} · {parent.name}</span><strong>{other.name}</strong><span className="neighborhood-next-bottom"><span>{count ? <>سجلات منشورة: <b>{count}</b></> : "قيد إضافة السجلات"}</span><span className="neighborhood-next-arrow" aria-hidden="true">↙</span></span></span>
        </Link>;
      })}</div>
    </section>
  </div></section>;
}
