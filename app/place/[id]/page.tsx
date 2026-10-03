import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { areas, getRecord, publicRecords, statusLabel, siteUrl } from "@/lib/data";
import { placeArtCaption, placeArtSrc } from "@/lib/artwork";

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

        <article className="place-profile">
          <div className="place-cover">
            <div className="place-cover-copy">
              <div className="place-cover-overline"><span className="place-sigil" aria-hidden="true">✦</span><span>دليل الوقف</span><span aria-hidden="true">/</span><span>ملف نشاط</span></div>
              <div className="place-cover-tags"><span className="place-category">{record.category}</span><span className="place-confidence"><CheckIcon /> {statusLabel(record.confidence)}</span></div>
              <h1>{record.name_ar}</h1>
              <p className="place-cover-lead">{record.facts}</p>
              <div className="place-cover-actions">
                {phone?.length ? <a className="place-call" href={`tel:${phone[0].replace(/\D/g, "")}`}><PhoneIcon /> اتصل الآن <span>{phone[0]}</span></a> : null}
                <a className="place-source-jump" href="#place-source">راجع مرجع السجل <span aria-hidden="true">↙</span></a>
              </div>
              <div className="place-cover-location"><MapPinIcon /><span>{record.locality}</span>{area ? <Link href={`/areas/${area.slug}`}>استكشف {area.name} <span aria-hidden="true">↙</span></Link> : null}</div>
            </div>
            <div className="place-cover-visual"><span className="place-visual-orbit" aria-hidden="true"/><div className="place-art-frame"><Image src={placeArtSrc(record.id)} width={600} height={340} alt={`تصور فني لفئة ${record.category}`} unoptimized sizes="(max-width: 600px) 100vw, 50vw" /><span>{placeArtCaption(record.id)}</span></div><div className="place-visual-foot"><span>من المكان إلى التفاصيل</span><b>{record.id}</b></div></div>
          </div>
          <div className="place-information">
            <section className="place-information-main" aria-labelledby="place-information-title">
              <span className="section-kicker">تفاصيل في لمحة</span><h2 id="place-information-title">عن هذا <em>النشاط</em></h2>
              <dl className="place-facts-list">
                <div><dt><MapPinIcon /> الموقع</dt><dd>{record.locality}</dd></div>
                {record.phone_or_code ? <div><dt><PhoneIcon /> الهاتف / الرمز</dt><dd dir="auto">{record.phone_or_code}</dd></div> : null}
                <div><dt>المركز والمحافظة</dt><dd>الوقف · قنا</dd></div>
                <div><dt>رقم السجل</dt><dd className="place-record-id">{record.id}</dd></div>
              </dl>
            </section>
            <aside className="place-source-panel" id="place-source" aria-labelledby="place-source-title"><span className="place-source-emblem" aria-hidden="true">✦</span><span className="place-source-kicker">مرجع السجل</span><h2 id="place-source-title">تحقّق من التفاصيل</h2><p>اطّلع على الرابط المرفق بهذا السجل، وراجع الاسم والعنوان في المصدر قبل الاعتماد على المعلومات.</p><a href={record.source_url} target="_blank" rel="noreferrer">فتح رابط المصدر <span aria-hidden="true">↗</span></a><small>الدليل يتوسع تدريجيًا، وقد تتغير بيانات الأنشطة.</small></aside>
          </div>
        </article>

        {related.length ? <section className="related-section" aria-labelledby="related-title">
          <div className="related-heading"><div><span className="section-kicker">مسارات قريبة · تابع الاستكشاف</span><h2 id="related-title">المزيد في {record.batch_area}</h2><p>أنشطة أخرى من المنطقة نفسها، تبدأ بما يشارك هذا الملف فئته إن وُجد.</p></div>{area ? <a href={`/areas/${area.slug}?category=${encodeURIComponent(record.category)}#directory-results`} className="text-link large">كل أنشطة {record.category} <span aria-hidden="true">↙</span></a> : null}</div>
          <div className="related-grid">{related.map((item, index) => <Link href={`/place/${item.id}`} className="related-card" key={item.id}>
            <span className="related-art"><Image src={placeArtSrc(item.id)} width={600} height={340} alt="" unoptimized sizes="(max-width: 600px) 100vw, 33vw" /><span className="related-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="related-art-caption">{placeArtCaption(item.id)}</span></span>
            <span className="related-card-body">
              <span className="related-card-meta"><span className="related-category">{item.category}</span><span className="related-connection">{item.category === record.category ? "من الفئة نفسها" : "من المنطقة نفسها"}</span></span>
              <strong>{item.name_ar}</strong>
              <span className="related-card-foot"><span className="related-place"><MapPinIcon /> {item.locality}</span><span className="related-card-cta">اكتشف النشاط <span className="related-arrow" aria-hidden="true">↙</span></span></span>
            </span>
          </Link>)}</div>
        </section> : null}
      </div>
    </section>
  );
}
