import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SearchDirectory from "@/components/SearchDirectory";
import { areas, getAreaRecords, neighborhoods, siteUrl } from "@/lib/data";

export function generateStaticParams() { return areas.map(area => ({ slug: area.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find(item => item.slug === slug);
  if (!area) return {};
  return { title: `دليل ${area.name}`, description: `${area.description} تصفح الأنشطة والخدمات الموثقة في ${area.name} - مركز الوقف، قنا.`, alternates: { canonical: `/areas/${slug}` } };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas.find(item => item.slug === slug);
  if (!area) notFound();
  const records = getAreaRecords(slug);
  const categories = new Set(records.map(r=>r.category)).size;
  return <section className="page-shell"><div className="shell"><div className="area-page-hero"><span className="section-kicker">{area.kicker}</span><h1>{area.name}</h1><p>{area.description}</p><div className="area-stats"><span><b>{records.length}</b> سجل جاهز</span><span><b>{categories}</b> فئة</span></div></div><JsonLd data={{"@context":"https://schema.org", "@type":"CollectionPage", name:area.name, url:`${siteUrl}/areas/${slug}`}}/>{slug === "alwaqf" ? <nav aria-label="أحياء مدينة الوقف" className="neighborhood-links">{neighborhoods.map(n=><Link key={n.slug} href={`/neighborhoods/${n.slug}`}>{n.name}</Link>)}</nav> : null}<SearchDirectory records={records}/></div></section>;
}
