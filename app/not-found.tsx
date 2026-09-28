import Link from "next/link";
export default function NotFound(){return <section className="page-shell"><div className="shell empty-state standalone"><span>404</span><h1>الصفحة دي مش موجودة</h1><p>ارجع للدليل وابحث عن النشاط أو المنطقة اللي محتاجها.</p><Link className="primary-button" href="/directory">فتح الدليل</Link></div></section>}
