import type { Metadata } from "next";
import Link from "next/link";
import SearchDirectory from "@/components/SearchDirectory";
import PosterScene from "@/components/PosterScene";
import CategorySymbol from "@/components/CategorySymbol";
import { ArrowIcon, CheckIcon, MapPinIcon, SearchIcon } from "@/components/Icons";
import { areas, getAreaRecords, getNeighborhoodRecords, neighborhoods, publicRecords } from "@/lib/data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const areaCounts = Object.fromEntries(areas.map((area) => [area.slug, getAreaRecords(area.slug).length]));
const neighborhoodCounts = Object.fromEntries(neighborhoods.map((neighborhood) => [neighborhood.slug, getNeighborhoodRecords(neighborhood.name).length]));
const featuredPaths = [
  { category: "صيدلية", kind: "pharmacy", eyebrow: "الصحة اليومية", description: "صيدليات منشورة بمصادرها في قرى ومناطق الوقف." },
  { category: "سوبرماركت", kind: "market", eyebrow: "احتياجات البيت", description: "أماكن تسوّق محلية تجدها باسمها ومنطقتها." },
  { category: "تعليم ابتدائي", kind: "school", eyebrow: "التعليم", description: "مدارس ابتدائية لها صفحة ومعلومة قابلة للمراجعة." },
  { category: "مسجد", kind: "mosque", eyebrow: "معالم وخدمات", description: "مساجد مدرجة بعناوينها المحلية في الدليل." },
] as const;

export default function Home() {
  const categoriesCount = new Set(publicRecords.map((record) => record.category)).size;

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> دليل محلي من قلب قنا</span>
              <h1>الوقف على<br /><em>خريطة واحدة.</em></h1>
              <p>أماكن تعرفها، وخدمات تحتاجها، ومصادر تقدر ترجع لها. اكتشف مدينة الوقف وقراها وأحياءها من دليل مرتب وواضح.</p>
              <div className="hero-actions">
                <Link href="/directory" className="primary-button"><SearchIcon /> ابحث عن خدمة <ArrowIcon /></Link>
                <a href="#areas" className="ghost-button">تصفح المناطق <ArrowIcon /></a>
              </div>
              <div className="hero-note"><CheckIcon /> تظهر السجلات المكتملة التحقق فقط</div>
            </div>

            <div className="hero-poster">
              <div className="poster-grid" aria-hidden="true" />
              <div className="poster-head"><span>دليل الوقف</span><span>قنا · مصر / ٠١</span></div>
              <div className="poster-watermark" aria-hidden="true">و</div>
              <PosterScene />
              <div className="poster-content">
                <span className="poster-kicker"><MapPinIcon /> من المدينة إلى القرية</span>
                <h2>كل مكان<br />له حكاية وعنوان.</h2>
                <div className="poster-route" aria-label="مناطق الدليل">
                  {areas.map((area, index) => (
                    <Link href={`/areas/${area.slug}`} className="route-stop" key={area.slug}>
                      <span className="route-node" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <span>{area.name}</span>
                      <span className="route-count">سجلات: {areaCounts[area.slug]}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="poster-foot"><span>دليل يتوسع مع التحقق</span><span>قنا · جنوب مصر</span></div>
            </div>
          </div>

          <div className="hero-stats" aria-label="أرقام الدليل">
            <span className="stats-caption">الدليل في أرقام <span aria-hidden="true">↙</span></span>
            <div><strong>{publicRecords.length}</strong><span>نشاط وخدمة</span></div>
            <div><strong>{categoriesCount}</strong><span>فئة متنوعة</span></div>
            <div><strong>{areas.length}</strong><span>مناطق رئيسية</span></div>
          </div>
        </div>
      </section>

      <section className="section areas-section" id="areas">
        <div className="shell">
          <div className="section-head"><div><span className="section-kicker">01 / الأماكن</span><h2>من قلب المدينة<br />إلى آخر القرية.</h2></div><p>ابدأ من المنطقة التي تعرفها. لكل مدينة وقرية صفحة تجمع الخدمات والأنشطة الجاهزة للنشر فيها.</p></div>
          <div className="area-grid">
            {areas.map((area, index) => (
              <Link href={`/areas/${area.slug}`} className={`area-card area-${index + 1}`} key={area.slug}>
                <span className="area-index">0{index + 1}</span>
                <span className="area-type">{area.accent}</span>
                <span className="area-letter" aria-hidden="true">{area.name.charAt(0)}</span>
                <div className="area-content"><span className="area-kicker">{area.kicker}</span><h3>{area.name}</h3><p>{area.description}</p></div>
                <div className="area-bottom"><span><b>{areaCounts[area.slug]}</b> سجل جاهز</span><span className="circle-arrow" aria-hidden="true">↙</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section paths-section" aria-labelledby="paths-title">
        <div className="shell">
          <div className="paths-heading"><div><span className="section-kicker">اختصار الطريق</span><h2 id="paths-title">ابدأ من<br /><em>احتياجك اليوم.</em></h2></div><p>أربع بدايات سريعة من فئات موجودة في الدليل. اختر واحدة، ثم ابحث داخل نتائجها عن الاسم أو المنطقة التي تريدها.</p></div>
          <div className="path-grid">
            {featuredPaths.map((path, index) => {
              const count = publicRecords.filter((record) => record.category === path.category).length;
              return <Link href={`/directory?category=${encodeURIComponent(path.category)}`} className={`path-card path-${path.kind}`} key={path.category}>
                <span className="path-index">مسار / 0{index + 1}</span>
                <span className="path-symbol"><CategorySymbol kind={path.kind} /></span>
                <span className="path-eyebrow">{path.eyebrow}</span>
                <h3>{path.category}</h3>
                <p className="path-description">{path.description}</p>
                <span className="path-bottom"><span><b>{count}</b> سجل منشور</span><span className="path-arrow" aria-hidden="true">↙</span></span>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="section search-section" id="search">
        <div className="shell">
          <div className="section-head"><div><span className="section-kicker">02 / الدليل</span><h2>تدور على إيه<br />في الوقف؟</h2></div><p>ابحث بالاسم أو نوع الخدمة أو الحي، ثم ضيّق النتائج حسب الفئة والمنطقة. كل نتيجة هنا لها مصدر يمكن مراجعته.</p></div>
          <SearchDirectory records={publicRecords} compact />
        </div>
      </section>

      <section className="section neighborhoods-section">
        <div className="shell split-feature">
          <div className="neighborhood-copy"><span className="section-kicker">03 / الأحياء</span><h2>كل حي له<br />مكان على الدليل.</h2><p>نربط النشاط بالحي حين يؤكد عنوانه أو مصدره ذلك. تصفح الدندراوية، السنابسة، المداكير وغيرها من التجمعات داخل مدينة الوقف.</p><Link href="/areas/alwaqf" className="text-link large">استكشف أحياء مدينة الوقف <span aria-hidden="true">↙</span></Link></div>
          <div className="neighborhood-board">
            <div className="board-title"><span>أحياء مدينة الوقف</span><span>دليل المناطق / {neighborhoods.length}</span></div>
            <div className="board-overview">
              <div className="board-overview-copy"><span>فهرس المكان</span><strong>قريب منك،<br />حيًا بحي.</strong></div>
              <span className="board-total"><b>{neighborhoods.length}</b><small>أحياء وتجمعات</small></span>
              <svg viewBox="0 0 520 150" fill="none" aria-hidden="true" className="board-route"><path d="M-20 105C63 102 86 37 162 55S248 158 330 105 435 9 545 38" stroke="currentColor" strokeWidth="2" strokeDasharray="5 8"/><circle cx="81" cy="75" r="7"/><circle cx="246" cy="109" r="7"/><circle cx="402" cy="55" r="7"/></svg>
            </div>
            <div className="neighborhood-cloud">{neighborhoods.map((neighborhood, index) => {
              const count = neighborhoodCounts[neighborhood.slug];
              return <Link href={`/neighborhoods/${neighborhood.slug}`} key={neighborhood.name}>
                <span className="board-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="board-name">{neighborhood.name}</span>
                <span className="board-count">{count ? `${count} سجل` : "قيد الإضافة"}</span>
                <span className="board-arrow" aria-hidden="true">↙</span>
              </Link>;
            })}</div>
            <div className="board-footer"><span className="board-footer-dot" /> العدد يعكس السجلات الجاهزة للنشر في كل حي</div>
          </div>
        </div>
      </section>

      <section className="section methodology">
        <div className="shell"><div className="section-head methodology-head"><div><span className="section-kicker">كيف نعمل؟</span><h2>الدقة تبدأ قبل النشر.</h2></div><Link href="/about" className="text-link large">اقرأ منهج الدليل <span aria-hidden="true">↙</span></Link></div>
          <div className="methodology-grid">
            <div className="method-card"><div className="method-top"><span className="method-icon"><SearchIcon /></span><span className="method-step">01 / نجمع</span></div><h3>معلومة لها أصل</h3><p>نبدأ بمصادر قابلة للمراجعة، من الجهات الرسمية إلى الأدلة والخرائط المحلية.</p><span className="method-foot">البداية · المصدر</span></div>
            <div className="method-card"><div className="method-top"><span className="method-icon"><MapPinIcon /></span><span className="method-step">02 / نراجع</span></div><h3>عنوان في مكانه</h3><p>نطابق الأسماء والعناوين والهواتف، ونفصل التكرار والتعارض قبل العرض.</p><span className="method-foot">الوسط · المطابقة</span></div>
            <div className="method-card"><div className="method-top"><span className="method-icon"><CheckIcon /></span><span className="method-step">03 / ننشر</span></div><h3>الجاهز فقط</h3><p>تظهر السجلات المكتملة، وتبقى البيانات التي تحتاج تحققًا إضافيًا خارج الدليل العام.</p><span className="method-foot">النتيجة · دليل موثوق</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
