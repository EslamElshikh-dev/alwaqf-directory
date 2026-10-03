"use client";

import { normalizeSearch } from "@/lib/search";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon, MapPinIcon, PhoneIcon, SearchIcon } from "@/components/Icons";
import type { DirectoryRecord } from "@/lib/data";
import { hasPlaceScene, placeArtSrc } from "@/lib/artwork";

type Props = { records: DirectoryRecord[]; compact?: boolean };
const PAGE_SIZE = 12;

export default function SearchDirectory({ records, compact = false }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [area, setArea] = useState("الكل");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => ["الكل", ...Array.from(new Set(records.map(r => r.category))).sort((a,b)=>a.localeCompare(b,"ar"))], [records]);
  const areas = useMemo(() => ["الكل", ...Array.from(new Set(records.map(r => r.batch_area || r.locality))).sort((a,b)=>String(a).localeCompare(String(b),"ar"))], [records]);
  useEffect(() => {
    if (compact) return;
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");
    const selectedArea = params.get("area");
    if (selectedCategory && categories.includes(selectedCategory)) setCategory(selectedCategory);
    if (selectedArea && areas.includes(selectedArea)) setArea(selectedArea);
    setQuery(params.get("q")?.slice(0, 120) || "");
  }, [compact, categories, areas]);
  const quickCategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const record of records) counts.set(record.category, (counts.get(record.category) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ar")).slice(0, 6);
  }, [records]);

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return records.filter(record => {
      if (category !== "الكل" && record.category !== category) return false;
      if (area !== "الكل" && (record.batch_area || record.locality) !== area) return false;
      if (!q) return true;
      const haystack = normalizeSearch(`${record.name_ar} ${record.category} ${record.locality} ${record.batch_area} ${record.facts} ${record.neighborhood_canonical || ""}`);
      return haystack.includes(q);
    });
  }, [records, query, category, area]);

  const visible = compact ? filtered.slice(0, 8) : filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;
  const fullParams = new URLSearchParams();
  if (query.trim()) fullParams.set("q", query.trim());
  if (category !== "الكل") fullParams.set("category", category);
  if (area !== "الكل") fullParams.set("area", area);
  const fullHref = fullParams.size ? `/directory?${fullParams}` : "/directory";

  return (
    <div className="directory-module" id="directory-results">
      <div className="search-panel">
        <label className="search-field"><span>ابحث في الدليل</span><span className="field-control"><SearchIcon /><input type="search" value={query} onChange={e=>{setQuery(e.target.value); setVisibleCount(PAGE_SIZE);}} placeholder="اسم نشاط، خدمة، شارع أو حي…" /></span></label>
        <label className="filter-field"><span>الفئة</span><select value={category} onChange={e=>{setCategory(e.target.value); setVisibleCount(PAGE_SIZE);}}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
        <label className="filter-field"><span>المنطقة</span><select value={area} onChange={e=>{setArea(e.target.value); setVisibleCount(PAGE_SIZE);}}>{areas.map(item => <option key={item}>{item}</option>)}</select></label>
      </div>
      {records.length > 12 ? <div className="quick-filters" role="group" aria-label="فئات الدليل"><span>فئات في الدليل</span><div className="quick-filters-list">{quickCategories.map(([name, count]) => <button type="button" key={name} aria-pressed={category === name} onClick={() => {setCategory(category === name ? "الكل" : name); setVisibleCount(PAGE_SIZE);}}>{name}<small>{count}</small></button>)}</div></div> : null}
      <div className="results-line" role="status" aria-live="polite"><span><b>{filtered.length}</b> نتيجة مطابقة</span><button className="reset-filters" onClick={() => {setQuery(""); setCategory("الكل"); setArea("الكل"); setVisibleCount(PAGE_SIZE);}}>مسح البحث والفلاتر</button></div>
      <div className="records-grid">
        {visible.map((record, index) => (
          <article className="record-card" key={record.id}>
            <Link href={`/place/${record.id}`} className="record-art" aria-label={`عرض ${record.name_ar}`}><Image src={placeArtSrc(record.id)} width={600} height={340} alt={`تصور فني لفئة ${record.category}`} unoptimized sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" />{!compact ? <span className="record-art-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span> : null}<span>{hasPlaceScene(record.id) ? "تصور فني" : "رسم تعبيري"}</span></Link>
            <div className="record-body">
              <div className="record-top"><span className="category-chip">{record.category}</span><span className="verified"><CheckIcon /> له مصدر</span></div>
              <h3><Link href={`/place/${record.id}`}>{record.name_ar}</Link></h3>
              <p>{record.facts}</p>
              <div className="record-meta"><span><MapPinIcon />{record.locality}</span>{record.phone_or_code ? <span><PhoneIcon />{record.phone_or_code}</span> : null}</div>
              <Link className="text-link" href={`/place/${record.id}`}>عرض التفاصيل <span aria-hidden="true">←</span></Link>
            </div>
          </article>
        ))}
      </div>
      {!compact && remaining > 0 ? <div className="directory-more"><div className="directory-more-copy"><span>واصل الاستكشاف</span><strong>شاهدت {visible.length} من {filtered.length} نشاطًا</strong><p>كل خطوة تكشف لك خدمات وأماكن أخرى في مركز الوقف.</p></div><div className="directory-more-control"><div className="directory-more-track" role="progressbar" aria-label="تقدم عرض نتائج الدليل" aria-valuenow={visible.length} aria-valuemin={0} aria-valuemax={filtered.length}><span style={{width: `${visible.length / filtered.length * 100}%`}} /></div><button type="button" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>اعرض {Math.min(PAGE_SIZE, remaining)} نشاطًا آخر <span aria-hidden="true">↙</span></button></div></div> : null}
      {compact && filtered.length > 0 ? <div className="center-action"><Link href={fullHref} className="primary-button">افتح الدليل الكامل <span aria-hidden="true">↙</span></Link></div> : null}
      {!visible.length ? <div className="empty-state"><SearchIcon /><h3>ما لقيناش نتيجة مطابقة</h3><p>جرّب اسمًا أقصر أو اختر فئة أو منطقة مختلفة.</p></div> : null}
    </div>
  );
}
