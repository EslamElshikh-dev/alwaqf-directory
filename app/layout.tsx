import type { Metadata } from "next";
import "./globals.css";
import "./design.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "@fontsource/ibm-plex-sans-arabic/latin-400.css";
import "@fontsource/ibm-plex-sans-arabic/latin-600.css";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "دليل الوقف | دليل الأنشطة والخدمات في الوقف قنا", template: "%s | دليل الوقف" },
  description: "دليل محلي منظم لخدمات وأنشطة مركز الوقف بمحافظة قنا: مدينة الوقف، المراشدة، القلمينا، جزيرة الحمودي والأحياء المحلية.",
  openGraph: { title: "دليل الوقف", description: "اكتشف الخدمات والأنشطة المحلية في مركز الوقف بمحافظة قنا.", type: "website", locale: "ar_EG", url: siteUrl, siteName: "دليل الوقف" },
  twitter: { card: "summary_large_image", title: "دليل الوقف", description: "دليل محلي موثّق لمركز الوقف بمحافظة قنا" },
  icons: { icon: "/logo.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><a href="#main-content" className="skip-link">تخط إلى المحتوى</a><JsonLd data={{"@context":"https://schema.org", "@type":"WebSite", "@id":`${siteUrl}/#website`, name:"دليل الوقف", url:siteUrl, inLanguage:"ar-EG"}}/><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
