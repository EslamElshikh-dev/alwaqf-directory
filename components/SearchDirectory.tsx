"use client";

import { normalizeSearch } from "@/lib/search";
import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckIcon, MapPinIcon, PhoneIcon, SearchIcon } from "@/components/Icons";
import type { DirectoryRecord } from "@/lib/data";

type Props = { records: DirectoryRecord[]; compact?: boolean };

export default function SearchDirectory({ records, compact = false }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [area, setArea] = useState("الكل");

  const categories = useMemo(() => ["الكل", ...Array.from(new Set(records.map(r => r.category))).sort((a,b)=>a.localeCompare(b,"ar"))], [records]);
  const areas = useMemo(() => ["الكل", ...Array.from(new Set(records.map(r => r.batch_area || r.locality))).sort((a,b)=>String(a).localeCompare(String(b),"ar"))], [records]);

  const filtered = useMemo(() => records.filter(record => {
    const haystack = normalizeSearch(`${record.name_ar} ${record.category} ${record.locality} ${record.batch_area} ${record.facts} ${record.neighborhood_canonical || ""}`);
    const q = normalizeSearch(query);
    return (!q || haystack.includes(q)) && (category === "الكل" || record.category === category) && (area === "الكل" || (record.batch_area || record.locality) === area);
  }), [records, query, category, area]);

  const visible = compact ? filtered.slice(0, 8) : filtered;

  return (
    <div className="directory-module">
      <div className="search-panel">
        <label className="search-field"><span>ابحث في الدليل</span><span className="field-control"><SearchIcon /><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="اسم نشاط، خدمة، شارع أو حي…" /></span></label>
        <label className="filter-field"><span>الفئة</span><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
        <label className="filter-field"><span>المنطقة</span><select value={area} onChange={e=>setArea(e.target.value)}>{areas.map(item => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="results-line" role="status" aria-live="polite"><span><b>{filtered.length}</b> نتيجة مطابقة</span><button className="reset-filters" onClick={() => {setQuery(""); setCategory("الكل"); setArea("الكل");}}>مسح البحث والفلاتر</button></div>
      <div className="records-grid">
        {visible.map(record => (
          <article className="record-card" key={record.id}>
            <div className="record-top"><span className="category-chip">{record.category}</span><span className="verified"><CheckIcon /> له مصدر</span></div>
            <h3><Link href={`/place/${record.id}`}>{record.name_ar}</Link></h3>
            <p>{record.facts}</p>
            <div className="record-meta"><span><MapPinIcon />{record.locality}</span>{record.phone_or_code ? <span><PhoneIcon />{record.phone_or_code}</span> : null}</div>
            <Link className="text-link" href={`/place/${record.id}`}>عرض التفاصيل <span>←</span></Link>
          </article>
        ))}
      </div>
      {compact && filtered.length > 8 ? <div className="center-action"><Link href="/directory" className="primary-button">استعرض كل النتائج</Link></div> : null}
      {!visible.length ? <div className="empty-state"><SearchIcon /><h3>ما لقيناش نتيجة مطابقة</h3><p>جرّب اسمًا أقصر أو اختر فئة أو منطقة مختلفة.</p></div> : null}
    </div>
  );
}
