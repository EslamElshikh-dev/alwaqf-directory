import type { Metadata } from "next";
import Link from "next/link";
import SearchDirectory from "@/components/SearchDirectory";
import { ArrowIcon, CheckIcon, MapPinIcon, SearchIcon } from "@/components/Icons";
import { areas, neighborhoods, publicRecords } from "@/lib/data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const areaCounts = Object.fromEntries(areas.map(area => [area.slug, area.slug === "alwaqf" ? publicRecords.filter(r=>r.batch_area === "مدينة الوقف").length : area.slug === "almarashda" ? publicRecords.filter(r=>r.batch_area === "المراشدة").length : area.slug === "alqalamina" ? publicRecords.filter(r=>r.batch_area === "القلمينا").length : publicRecords.filter(r=>r.batch_area === "جزيرة الحمودي").length]));

export default function Home() {
  const categoriesCount = new Set(publicRecords.map(r=>r.category)).size;
  return (
    <>
      <section className="hero">
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><CheckIcon /> بيانات محلية يتم التحقق منها قبل النشر</span>
            <h1>الوقف أقرب لك.<br/><em>ابحث واعرف المكان.</em></h1>
            <p>دليل رقمي حديث يجمع الأنشطة والخدمات والمعالم في مركز الوقف بمحافظة قنا، من قلب مدينة الوقف إلى المراشدة والقلمينا وجزيرة الحمودي.</p>
            <div className="hero-actions"><Link href="/directory" className="primary-button"><SearchIcon /> ابدأ البحث</Link><a href="#areas" className="ghost-button">استكشف المناطق <ArrowIcon /></a></div>
            <div className="hero-trust"><span><b>{publicRecords.length}</b> نشاط وخدمة</span><span><b>{categoriesCount}</b> فئة وخدمة</span><span><b>{areas.length}</b> مناطق رئيسية</span></div>
          </div>
          <div className="hero-card">
            <div className="map-pattern"/>
            <div className="location-badge"><MapPinIcon /><span>مركز الوقف<small>محافظة قنا · مصر</small></span></div>
            <div className="hero-card-copy"><span>دليل حيّ يتوسع باستمرار</span><h2>كل قرية، حي وخدمة<br/>في مسار واحد واضح.</h2></div>
            <div className="mini-places"><span>الدندراوية</span><span>السنابسة</span><span>المداكير</span><span>البهايجة</span><span>المراشدة</span><span>القلمينا</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="areas"><div className="shell"><div className="section-head"><div><span className="section-kicker">استكشف حسب المنطقة</span><h2>من المدينة للقرية… كل مكان له صفحته</h2></div><p>التقسيم مبني على سجلات موثقة ومراجعة يدوية للتبعية المحلية، مع الحفاظ على الأسماء البديلة بدون تكرار الصفحات.</p></div>
        <div className="area-grid">{areas.map((area, index)=><Link href={`/areas/${area.slug}`} className={`area-card area-${index+1}`} key={area.slug}><span className="area-index">0{index+1}</span><span className="area-type">{area.accent}</span><h3>{area.name}</h3><p>{area.description}</p><div><b>{areaCounts[area.slug]}</b><small> سجل جاهز</small><span className="circle-arrow">←</span></div></Link>)}</div>
      </div></section>

      <section className="section soft-section"><div className="shell"><div className="section-head"><div><span className="section-kicker">بحث مباشر</span><h2>دور على اللي محتاجه في ثواني</h2></div><p>ابحث بالاسم أو نوع الخدمة أو المنطقة. البيانات غير المؤكدة لا تظهر في النتائج العامة.</p></div><SearchDirectory records={publicRecords} compact /></div></section>

      <section className="section"><div className="shell split-feature"><div><span className="section-kicker">خريطة الأحياء</span><h2>مدينة الوقف متقسمة بوضوح، مش مجرد عنوان عام</h2><p>نربط كل نشاط بالحي الحقيقي فقط عندما يكون العنوان أو المصدر كافيًا. التوزيع الحالي يشمل الدندراوية، السنابسة، المداكير، الهداورة، البهايجة والحمزية، إضافة لتجمعات فرعية مثل رنة البهايجة والفلطية.</p><Link href="/areas/alwaqf" className="text-link large">استكشف مدينة الوقف والأحياء ←</Link></div><div className="neighborhood-cloud">{neighborhoods.map(n=><Link href={`/neighborhoods/${n.slug}`} key={n.name}>{n.name}</Link>)}</div></div></section>

      <section className="section methodology"><div className="shell methodology-grid"><div className="method-card"><span>01</span><h3>نجمع</h3><p>من مصادر رسمية، خرائط، أدلة أعمال ومصادر محلية قابلة للمراجعة.</p></div><div className="method-card"><span>02</span><h3>نراجع</h3><p>نطابق الاسم والمكان والهاتف ونفصل التكرار والتعارض قبل النشر.</p></div><div className="method-card"><span>03</span><h3>ننشر</h3><p>السجلات الجاهزة فقط تظهر للزائر، والباقي يظل داخل مسار التحقق.</p></div></div></section>
    </>
  );
}
