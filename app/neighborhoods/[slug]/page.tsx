import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SearchDirectory from "@/components/SearchDirectory";
import JsonLd from "@/components/JsonLd";
import { neighborhoods, getNeighborhoodRecords, siteUrl } from "@/lib/data";
export function generateStaticParams() { return neighborhoods.map(n => ({slug:n.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params; const n=neighborhoods.find(n=>n.slug===decodeURIComponent(slug)); if(!n)return {};
 return {title:`دليل ${n.name}`,description:`استكشف الخدمات والأنشطة ذات العنوان المثبت في ${n.name} بمدينة الوقف، قنا.`,alternates:{canonical:`/neighborhoods/${encodeURIComponent(n.slug)}`}};
}
export default async function NeighborhoodPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const n=neighborhoods.find(n=>n.slug===decodeURIComponent(slug));if(!n)notFound();
 const records=getNeighborhoodRecords(n.name);
 return <section className="page-shell"><div className="shell"><Link href="/areas/alwaqf" className="back-link">مدينة الوقف ←</Link><div className="area-page-hero"><span className="section-kicker">أحياء وتجمعات مدينة الوقف</span><h1>{n.name}</h1><p>الأنشطة والخدمات المرتبطة بعنوان واضح داخل {n.name}. وجود صفحة المنطقة لا يعني اكتمال حصر أنشطتها.</p><a className="text-link" href={n.evidence_url} target="_blank" rel="noreferrer">مصدر تعريف المنطقة ↗</a></div><JsonLd data={{"@context":"https://schema.org","@type":"CollectionPage",name:`دليل ${n.name}`,url:`${siteUrl}/neighborhoods/${encodeURIComponent(n.slug)}`}}/>{records.length ? <SearchDirectory records={records}/> : <div className="empty-state"><h2>نستكمل بيانات هذه المنطقة</h2><p>لا توجد أنشطة جاهزة للنشر ومرتبطة بهذه المنطقة حاليًا.</p><Link href="/areas/alwaqf" className="primary-button">تصفح خدمات مدينة الوقف</Link></div>}</div></section>;
}
