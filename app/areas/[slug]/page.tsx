import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ChapterCategoryGlyph from "@/components/ChapterCategoryGlyph";
import SearchDirectory from "@/components/SearchDirectory";
import { areas, getAreaRecords, getSearchableLocalityOptions, localities, siteUrl } from "@/lib/data";
import { placeArtSrc } from "@/lib/artwork";

const marashdaSceneIds = ["MR-001", "MR-002", "MR-003", "MR-004", "MR-005", "MR-006", "MR-007", "MR-009"];

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
  const areaLocalities = localities.filter(locality => locality.parentArea === slug);
  const marashdaScenes = slug === "almarashda" ? marashdaSceneIds.flatMap(id => {
    const record = records.find(item => item.id === id);
    return record ? [record] : [];
  }) : [];
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
      <div className="chapter-visual">
        <span className="chapter-visual-photo"><Image src={`/images/areas/${area.slug}.webp`} alt={`تصور فني مستوحى من ${area.name}`} fill priority unoptimized sizes="(max-width: 650px) 100vw, 48vw" /></span>
        <span className="chapter-orbit chapter-orbit-one" aria-hidden="true"/><span className="chapter-orbit chapter-orbit-two" aria-hidden="true"/>
        <span className="chapter-visual-label">تصور فني · ليس صورة للمكان</span>
        <span className="chapter-folio" aria-hidden="true">{String(areaIndex + 1).padStart(2, "0")} <i>/</i> {String(areas.length).padStart(2, "0")}</span>
      </div>
      <div className="chapter-foot"><span>من المركز إلى المكان</span><span>تصفّح الخدمات والأنشطة حسب الفئة <span aria-hidden="true">↙</span></span></div>
    </div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: area.name, url: `${siteUrl}/areas/${slug}` }}/>
    {marashdaScenes.length ? <section className="marashda-scenes" aria-labelledby="marashda-scenes-title">
      <div className="marashda-scenes-heading">
        <div><span className="section-kicker">من قلب القرية / {String(marashdaScenes.length).padStart(2, "0")} مشاهد</span><h2 id="marashda-scenes-title">المراشدة، <em>لقطة بلقطة.</em></h2></div>
        <p>خدمات وأماكن من الدليل في مشاهد مصممة خصيصًا لكل فئة. افتح أي بطاقة لتصل إلى ملفها ومصدرها.</p>
      </div>
      <nav className="marashda-scenes-grid" aria-label="ملفات مصوّرة من المراشدة">
        {marashdaScenes.map((record, index) => <Link href={`/place/${record.id}`} className={`marashda-scene marashda-scene-${index + 1}`} key={record.id}>
          <Image src={placeArtSrc(record.id)} alt={`تصور فني لفئة ${record.category}`} fill unoptimized sizes="(max-width: 700px) 76vw, (max-width: 900px) 50vw, 25vw" />
          <span className="marashda-scene-top"><span>{String(index + 1).padStart(2, "0")} / {String(marashdaScenes.length).padStart(2, "0")}</span><span>{record.category}</span></span>
          <span className="marashda-scene-bottom"><strong>{record.name_ar}</strong><span aria-hidden="true">↙</span></span>
        </Link>)}
      </nav>
      <div className="marashda-scenes-foot"><span>الصور تصورات فنية للفئات، وليست صورًا توثيقية للمنشآت.</span><span className="marashda-scenes-swipe">مرّر لاستكشاف المشاهد <span aria-hidden="true">←</span></span></div>
    </section> : null}
    {topCategories.length ? <section className="chapter-categories" aria-labelledby="chapter-categories-title"><div className="chapter-section-title"><div><span className="section-kicker">أقرب طريق لما تبحث عنه</span><h2 id="chapter-categories-title">ابدأ من <em>فئة</em></h2></div><span>أبرز الفئات المتاحة في {area.name}</span></div><div className="chapter-category-grid">{topCategories.map(([name, count], index) => <a key={name} href={`/areas/${slug}?category=${encodeURIComponent(name)}#directory-results`} className="chapter-category"><span className="chapter-category-top"><span className="chapter-category-number">فئة / {String(index + 1).padStart(2, "0")}</span><span className="chapter-category-icon"><ChapterCategoryGlyph category={name} /></span></span><strong>{name}</strong><span className="chapter-category-meta"><span>{count === 1 ? "سجل منشور" : count === 2 ? "سجلان منشوران" : `${count} سجلات منشورة`}</span><span className="chapter-category-arrow" aria-hidden="true">↙</span></span></a>)}</div></section> : null}
    {areaLocalities.length ? <section className="chapter-neighborhoods" aria-labelledby="chapter-neighborhoods-title"><div><span className="section-kicker">استكشف المكان</span><h2 id="chapter-neighborhoods-title">{slug === "alwaqf" ? "مناطق المدينة وتجمعاتها" : "نجوع وعزب ومواضع"}</h2></div><nav aria-label={`التجمعات في ${area.name}`} className="neighborhood-links">{areaLocalities.map(n => <Link key={n.slug} href={`/localities/${encodeURIComponent(n.slug)}`}>{n.name}<span aria-hidden="true">↗</span></Link>)}</nav></section> : null}
    <div className="chapter-directory-heading"><span className="section-kicker">كل السجلات الجاهزة</span><h2>استكشف دليل {area.name}</h2></div>
    <SearchDirectory records={records} localityOptions={getSearchableLocalityOptions(records)}/>
  </div></section>;
}
