import type { Metadata } from "next";
import SearchDirectory from "@/components/SearchDirectory";
import { publicRecords } from "@/lib/data";

export const metadata: Metadata = { title: "دليل الأنشطة والخدمات", description: "ابحث في الأنشطة والخدمات الموثقة داخل مركز الوقف بمحافظة قنا.", alternates: { canonical: "/directory" } };

export default function DirectoryPage() {
  return <section className="page-shell"><div className="shell"><div className="page-hero"><span className="section-kicker">الدليل الكامل</span><h1>كل الخدمات والأنشطة<br/><em>في بحث واحد.</em></h1><p>نتائج منظمة من السجلات الجاهزة للنشر فقط، مع فلترة حسب الفئة والمنطقة.</p></div><SearchDirectory records={publicRecords} /></div></section>;
}
