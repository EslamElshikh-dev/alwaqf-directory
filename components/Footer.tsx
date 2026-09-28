import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">و</span><span><b>دليل الوقف</b><small>بيانات محلية منظمة وقابلة للتحقق</small></span></div>
          <p>منصة مجتمعية رقمية لتنظيم أنشطة وخدمات مركز الوقف بمحافظة قنا، مع فصل البيانات المؤكدة عن السجلات التي ما زالت قيد التحقق.</p>
        </div>
        <div><b>استكشف</b><Link href="/directory">كل الأنشطة</Link><Link href="/areas/alwaqf">مدينة الوقف</Link><Link href="/areas/almarashda">المراشدة</Link></div>
        <div><b>المشروع</b><Link href="/about">منهج التوثيق</Link><Link href="/areas/alqalamina">القلمينا</Link><Link href="/areas/jazirat-alhamoudi">جزيرة الحمودي</Link></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} دليل الوقف</span><span>قنا · مصر</span></div>
    </footer>
  );
}
