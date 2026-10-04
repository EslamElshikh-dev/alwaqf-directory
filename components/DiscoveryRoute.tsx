"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MapPinIcon, SearchIcon } from "./Icons";
import { placeArtSrc } from "@/lib/artwork";

export type RouteCombination = { area: string; category: string; count: number };
export type RoutePreview = { id: string; name: string; area: string; category: string };

type Props = { combinations: RouteCombination[]; areas: string[]; records: RoutePreview[] };

const shortcuts = [
  { href: "#areas", label: "المناطق" },
  { href: "#paths", label: "مسارات الخدمة" },
  { href: "#search", label: "البحث الحر" },
  { href: "#localities", label: "النجوع والعزب" },
] as const;

export default function DiscoveryRoute({ combinations, areas, records }: Props) {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");

  const categoryCounts = new Map<string, number>();
  for (const entry of combinations) {
    if (!area || entry.area === area) {
      categoryCounts.set(entry.category, (categoryCounts.get(entry.category) || 0) + entry.count);
    }
  }
  const categories = [...categoryCounts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ar"));
  const availableAreas = category
    ? areas.filter((name) => combinations.some((entry) => entry.area === name && entry.category === category))
    : areas;
  const count = combinations.reduce((total, entry) => total + ((!area || entry.area === area) && (!category || entry.category === category) ? entry.count : 0), 0);
  const matchingRecords = area || category
    ? records.filter((record) => (!area || record.area === area) && (!category || record.category === category))
    : [];
  const preview: RoutePreview[] = [];
  const seen = new Set<string>();
  for (const record of matchingRecords) {
    const key = category ? record.area : record.category;
    if (!seen.has(key)) {
      preview.push(record);
      seen.add(key);
      if (preview.length === 3) break;
    }
  }
  for (const record of matchingRecords) {
    if (preview.length === 3) break;
    if (!preview.some((item) => item.id === record.id)) preview.push(record);
  }

  const params = new URLSearchParams();
  if (area) params.set("area", area);
  if (category) params.set("category", category);
  const href = params.size ? `/directory?${params}` : "/directory";

  return (
    <section className="discovery-route" aria-labelledby="discovery-route-title">
      <div className="discovery-route-story">
        <span className="discovery-route-kicker"><span aria-hidden="true">✦</span> مسارك في الوقف / ٠١</span>
        <h2 id="discovery-route-title">اختر المكان.<br /><em>واكتشف ما فيه.</em></h2>
        <p>خطوتان صغيرتان تختصران الطريق إلى نشاط له اسم وعنوان ومصدر يمكنك مراجعته.</p>
        <div className="discovery-route-trace" aria-hidden="true">
          <span className="discovery-route-stop"><i>01</i><span><small>من</small><strong key={area || "all-areas"}>{area || "كل المناطق"}</strong></span></span>
          <span className="discovery-route-track"><i /></span>
          <span className="discovery-route-stop"><i>02</i><span><small>إلى</small><strong key={category || "all-categories"}>{category || "كل الأنشطة"}</strong></span></span>
        </div>
      </div>

      <div className="discovery-route-panel">
        <div className="discovery-route-fields">
          <label className="discovery-route-field">
            <span><MapPinIcon aria-hidden="true" /> 01 / أين تبحث؟</span>
            <select value={area} onChange={(event) => setArea(event.target.value)}>
              <option value="">كل مناطق الوقف</option>
              {availableAreas.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <span className="discovery-route-connector" aria-hidden="true">↙</span>
          <label className="discovery-route-field">
            <span><SearchIcon aria-hidden="true" /> 02 / ماذا تحتاج؟</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">كل الخدمات والأنشطة</option>
              {categories.map(([name, total]) => <option key={name} value={name}>{name} · {total}</option>)}
            </select>
          </label>
        </div>
        <div className="discovery-route-result">
          <span role="status" aria-live="polite"><strong>{count}</strong> سجل جاهز في هذا المسار</span>
          <Link href={href}>اعرض النتائج <span aria-hidden="true">↙</span></Link>
        </div>
      </div>

      {preview.length > 0 ? <div className="discovery-route-preview" key={`${area}|${category}`}>
        <div className="discovery-route-preview-head"><div><span>✦ من قلب الدليل</span><h3>أول محطات مسارك</h3></div><p>نظرة على {preview.length} من {count} سجلات جاهزة لهذا الاختيار</p></div>
        <div className="discovery-route-preview-grid">
          {preview.map((record, index) => <Link href={`/place/${record.id}`} className="discovery-route-preview-card" key={record.id}>
            <span className="discovery-route-preview-art"><Image src={placeArtSrc(record.id)} width={320} height={190} alt="" unoptimized sizes="(max-width: 650px) 72vw, (max-width: 960px) 42vw, 25vw" /><i aria-hidden="true">0{index + 1}</i></span>
            <span className="discovery-route-preview-content"><small>{record.category}</small><strong>{record.name}</strong><span><MapPinIcon aria-hidden="true" /> {record.area}<b aria-hidden="true">↙</b></span></span>
          </Link>)}
        </div>
      </div> : null}

      <nav className="discovery-route-shortcuts" aria-label="طرق أخرى للاستكشاف">
        <span>أو ابدأ بطريقتك</span>
        {shortcuts.map((item) => <a href={item.href} key={item.href}>{item.label}<span aria-hidden="true">↙</span></a>)}
      </nav>
    </section>
  );
}
