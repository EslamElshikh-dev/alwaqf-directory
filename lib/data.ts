import "server-only";
import { isPublishable } from "./publish";
import master from "@/data/master.json";

type OriginalRecord = (typeof master.records)[number];
export type DirectoryRecord = Pick<OriginalRecord, "id" | "name_ar" | "category" | "locality" | "facts" | "phone_or_code" | "source_url" | "confidence" | "batch_area" | "neighborhood_canonical">;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alwaqf-directory.vercel.app";
export const publicRecords: DirectoryRecord[] = master.records.filter(isPublishable).map(({id, name_ar, category, locality, facts, phone_or_code, source_url, confidence, batch_area, neighborhood_canonical}) => ({id, name_ar, category, locality, facts, phone_or_code, source_url, confidence, batch_area, neighborhood_canonical}));
export const neighborhoods = master.neighborhoods.filter(n => ["confirmed_current", "confirmed_locality", "confirmed_subarea", "map_locality"].includes(n.status)).map(n => ({name: n.name, slug: n.name.replaceAll(" ", "-"), evidence_url: n.evidence_url}));
export function getNeighborhoodRecords(name: string) { return publicRecords.filter(r => r.neighborhood_canonical === name || r.locality.split(/\s*-\s*/).includes(name)); }

export const areas = [
  { slug: "alwaqf", name: "مدينة الوقف", kicker: "قلب المركز", description: "الخدمات الحكومية، الصحة، التعليم، التجارة والأحياء داخل مدينة الوقف.", accent: "مدينة" },
  { slug: "almarashda", name: "المراشدة", kicker: "نواة الدليل", description: "خدمات ومؤسسات وأنشطة محلية موثقة داخل قرية المراشدة وتوابعها.", accent: "قرية" },
  { slug: "alqalamina", name: "القلمينا", kicker: "قرية رئيسية", description: "الصحة والتعليم والبريد والخدمات والأنشطة المحلية في القلمينا.", accent: "قرية" },
  { slug: "jazirat-alhamoudi", name: "جزيرة الحمودي", kicker: "قرية رئيسية", description: "الخدمات الصحية والتعليمية والمرافق والمعالم المحلية في جزيرة الحمودي.", accent: "قرية" },
] as const;

export function getAreaRecords(slug: string) {
  const area = areas.find((item) => item.slug === slug);
  if (!area) return [];
  if (slug === "alwaqf") return publicRecords.filter((r) => r.batch_area === "مدينة الوقف");
  if (slug === "almarashda") return publicRecords.filter((r) => r.batch_area === "المراشدة");
  if (slug === "alqalamina") return publicRecords.filter((r) => r.batch_area === "القلمينا");
  return publicRecords.filter((r) => r.batch_area === "جزيرة الحمودي");
}

export function getRecord(id: string) {
  return publicRecords.find((record) => record.id === id);
}

export function uniqueCategories(records = publicRecords) {
  return [...new Set(records.map((record) => record.category))].sort((a, b) => a.localeCompare(b, "ar"));
}

export function statusLabel(confidence: string) {
  if (confidence === "A") return "موثّق بدرجة عالية";
  if (confidence === "A/B") return "موثّق بمصدر جيد";
  return "مراجع";
}
