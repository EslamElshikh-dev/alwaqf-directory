import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { areas, getRecord, publicRecords, statusLabel, siteUrl } from "@/lib/data";

export function generateStaticParams() {
  return publicRecords.map((record) => ({ id: record.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const record = getRecord(id);
  if (!record) return {};
  return { title: record.name_ar, description: `${record.facts} ${record.locality}، مركز الوقف، قنا.`, alternates: { canonical: `/place/${id}` } };
}

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = getRecord(id);
  if (!record) notFound();

  const phone = record.phone_or_code?.split(" / ").filter((part) => /^(?:0[1-9][0-9 -]{8,12}|1[0-9]{2,4})$/.test(part));
  const area = areas.find((item) => item.name === record.batch_area);
  const areaRecords = publicRecords.filter((item) => item.id !== id && item.batch_area === record.batch_area);
  const related = [
    ...areaRecords.filter((item) => item.category === record.category),
    ...areaRecords.filter((item) => item.category !== record.category),
  ].slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${siteUrl}/place/${id}#place`,
    url: `${siteUrl}/place/${id}`,
    name: record.name_ar,
    description: record.facts,
    address: { "@type": "PostalAddress", addressLocality: record.locality, addressRegion: "قنا", addressCountry: "EG" },
    telephone: phone?.length ? phone : undefined,
    subjectOf: { "@type": "CreativeWork", url: record.source_url },
  };

  return (
    <section className="page-shell">
      <div className="shell detail-shell">
        <JsonLd data={jsonLd} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "دليل الوقف", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "الأنشطة والخدمات", item: `${siteUrl}/directory` },
          { "@type": "ListItem", position: 3, name: record.name_ar, item: `${siteUrl}/place/${id}` },
        ] }} />
        <nav className="detail-breadcrumb" aria-label="مسار التنقل">
          <Link href="/">الرئيسية</Link><span aria-hidden="true">←</span>
          <Link href="/directory">الدليل</Link><span aria-hidden="true">←</span>
          <span aria-current="page">{record.name_ar}</span>
        </nav>

        <article className="detail-card">
          <div className="record-top"><span className="category-chip">{record.category}</span><span className="verified"><CheckIcon /> {statusLabel(record.confidence)}</span></div>
          <h1>{record.name_ar}</h1>
          <p className="detail-lead">{record.facts}</p>
          <div className="detail-grid">
            <div><span className="detail-label">الموقع</span><strong><MapPinIcon /> {record.locality}</strong></div>
            {record.phone_or_code ? <div><span className="detail-label">الهاتف / الرمز</span><strong><PhoneIcon /> {record.phone_or_code}</strong></div> : null}
            <div><span className="detail-label">المركز والمحافظة</span><strong>الوقف · قنا</strong></div>
            <div><span className="detail-label">رقم السجل</span><strong>{record.id}</strong></div>
          </div>
          {phone?.length ? <a className="detail-call" href={`tel:${phone[0].replace(/\D/g, "")}`}><PhoneIcon /> اتصل الآن <span>{phone[0]}</span></a> : null}
          <div className="source-box"><span>مصدر التحقق</span><a href={record.source_url} target="_blank" rel="noreferrer">فتح المصدر الأصلي ↗</a></div>
        </article>

        {related.length ? <section className="related-section" aria-labelledby="related-title">
          <div className="related-heading"><div><span className="section-kicker">تابع الاستكشاف</span><h2 id="related-title">المزيد في {record.batch_area}</h2></div>{area ? <Link href={`/areas/${area.slug}`} className="text-link large">عرض صفحة المنطقة <span aria-hidden="true">↙</span></Link> : null}</div>
          <div className="related-grid">{related.map((item) => <Link href={`/place/${item.id}`} className="related-card" key={item.id}>
            <span className="related-category">{item.category}</span>
            <strong>{item.name_ar}</strong>
            <span className="related-place"><MapPinIcon /> {item.locality}</span>
            <span className="related-arrow" aria-hidden="true">↙</span>
          </Link>)}</div>
        </section> : null}
      </div>
    </section>
  );
}
