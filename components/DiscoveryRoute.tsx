"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPinIcon, SearchIcon } from "./Icons";

export type RouteCombination = { area: string; category: string; count: number };

type Props = { combinations: RouteCombination[]; areas: string[] };

const shortcuts = [
  { href: "#areas", label: "المناطق" },
  { href: "#paths", label: "مسارات الخدمة" },
  { href: "#search", label: "البحث الحر" },
  { href: "#neighborhoods", label: "الأحياء" },
] as const;

export default function DiscoveryRoute({ combinations, areas }: Props) {
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
        <span className="discovery-route-line" aria-hidden="true"><i /><i /><i /></span>
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

      <nav className="discovery-route-shortcuts" aria-label="طرق أخرى للاستكشاف">
        <span>أو ابدأ بطريقتك</span>
        {shortcuts.map((item) => <a href={item.href} key={item.href}>{item.label}<span aria-hidden="true">↙</span></a>)}
      </nav>
    </section>
  );
}
