import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "عن دليل الوقف",
  description: "منهج جمع ومراجعة ونشر بيانات دليل الوقف.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <section className="page-shell about-page"><div className="shell prose-page">
    <div className="about-head">
      <span className="section-kicker">عن المشروع / دليل الوقف</span>
      <h1>المكان يبدأ<br /><em>من معلومة دقيقة.</em></h1>
      <p>دليل الوقف مشروع رقمي لتنظيم الخدمات والأنشطة والمعالم داخل مركز الوقف بمحافظة قنا. نقدم بيانات عملية يمكن الرجوع إلى مصدرها، ونؤجل نشر السجلات المتعارضة أو القديمة حتى تُحسم.</p>
      <span className="about-head-note">الوقف، قنا <span aria-hidden="true">✦</span> دليل يتوسع مع التحقق</span>
    </div>
    <div className="about-body">
      <div className="about-section-head"><div><span className="section-kicker">المنهج</span><h2>من المعلومة إلى الصفحة.</h2></div><p>يمر كل سجل بمراحل جمع، وتطبيع للاسم والمكان، وإزالة للتكرار، وتقييم للمصدر، ثم تحديد حالة النشر. الأحياء والتجمعات المحلية تُراجع بالمنهج نفسه حتى لا تتكرر بسبب اختلاف التهجئة.</p></div>
      <div className="principles">
        <div><span className="principle-number">01</span><b>مصدر واضح</b><span>نضع مرجع السجل في متناول من يريد مراجعة التفاصيل.</span></div>
        <div><span className="principle-number">02</span><b>لا تخمين</b><span>إذا تعارضت المعلومة أو لم يكتمل التحقق، تبقى خارج الدليل العام حتى تُحسم.</span></div>
        <div><span className="principle-number">03</span><b>قابل للتوسع</b><span>يمكن إضافة قرى وأحياء وأنشطة جديدة مع الحفاظ على السجلات الأصلية.</span></div>
      </div>
      <Link href="/directory" className="text-link large about-explore">استكشف السجلات المنشورة <span aria-hidden="true">↙</span></Link>
    </div>
  </div></section>;
}
