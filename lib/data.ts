import "server-only";
import { isPublishable } from "./publish";
import master from "@/data/master.json";

type OriginalRecord = (typeof master.records)[number];
export type DirectoryRecord = Pick<OriginalRecord, "id" | "name_ar" | "category" | "locality" | "facts" | "phone_or_code" | "source_url" | "confidence" | "batch_area" | "neighborhood_canonical">;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alwaqf-directory.vercel.app";
export const publicRecords: DirectoryRecord[] = master.records.filter(isPublishable).map(({id, name_ar, category, locality, facts, phone_or_code, source_url, confidence, batch_area, neighborhood_canonical}) => ({id, name_ar, category, locality, facts, phone_or_code, source_url, confidence, batch_area, neighborhood_canonical}));
// A locality is a named place, not an assertion about its administrative rank.
// Additional named places retain their own evidence and do not claim administrative rank.
// The approved place catalogue includes more names than the original city-area list.
const additionalCityLocalityEvidence = [
  {name: "البدراوية", recordId: "WK-007", evidence_url: "https://www.elections.eg/images/pdfs/qrar-tashkel/30%20%202023.pdf", kind: "منطقة ببندر الوقف"},
  {name: "الشابورة", recordId: "WK-011", kind: "منطقة بالمدينة"},
  {name: "المشتل", recordId: "WK-005", kind: "موضع بالمدينة"},
  {name: "الوقف الجديدة", recordId: "WK-077", kind: "منطقة بمركز الوقف"},
] as const;
export const cityLocalities = [
  ...master.neighborhoods.filter(n => ["confirmed_current", "confirmed_locality", "confirmed_subarea", "map_locality"].includes(n.status)).map(n => ({name: n.name, slug: n.name.replaceAll(" ", "-"), evidence_url: n.evidence_url, parentArea: "alwaqf", kind: n.name.startsWith("عزبة") ? "عزبة بالمدينة" : "منطقة بالمدينة"})),
  ...additionalCityLocalityEvidence.flatMap(item => {
    const record = publicRecords.find(r => r.id === item.recordId && (r.neighborhood_canonical === item.name || r.locality.split(/\s*-\s*/).includes(item.name)));
    return record ? [{name: item.name, slug: item.name.replaceAll(" ", "-"), evidence_url: "evidence_url" in item ? item.evidence_url : record.source_url, parentArea: "alwaqf", kind: item.kind}] : [];
  }),
];
const ruralLocalityEvidence = [
  {name: "عزبة علام", parentArea: "almarashda", recordId: "MR-010"},
  {name: "نجع مكي", parentArea: "almarashda", recordId: "MR-013"},
  {name: "نجع الجامع", parentArea: "almarashda", recordId: "MR-046"},
  {name: "نجع المغاربة", parentArea: "almarashda", recordId: "MR-042"},
  {name: "نجع العرب والنجاجرة", parentArea: "almarashda", recordId: "MR-049"},
  {name: "نجع الجنينة", parentArea: "almarashda", recordId: "MR-058"},
  {name: "عزبة داوود", parentArea: "alqalamina", recordId: "QL-015"},
  {name: "كوبري عبادي", parentArea: "almarashda", recordId: "MR-050"},
] as const;
export const ruralLocalities: {name: string; slug: string; evidence_url: string; parentArea: string; kind: string}[] = ruralLocalityEvidence.flatMap(({name, parentArea, recordId}) => {
  const record = publicRecords.find(r => r.id === recordId && r.locality.split(/\s*-\s*/).includes(name));
  return record ? [{name, slug: name.replaceAll(" ", "-"), evidence_url: record.source_url, parentArea, kind: name.startsWith("عزبة") ? "عزبة" : name.startsWith("نجع") ? "نجع" : "موضع محلي"}] : [];
});
// A government commercial-register address verifies this locality even though no
// business from that register is ready for publication as a directory record yet.
const mandaratAlFouli = master.places.find(p => p.id === "PL-014");
if (mandaratAlFouli?.status === "confirmed_locality" && mandaratAlFouli.source_url) {
  ruralLocalities.push({name: "مندرة الفولي", slug: "مندرة-الفولي", evidence_url: mandaratAlFouli.source_url, parentArea: "almarashda", kind: "مندرة"});
}
export const localities = [...cityLocalities, ...ruralLocalities];
export function getLocalityRecords(name: string, parentArea: string) {
  const area = areas.find(item => item.slug === parentArea);
  if (!area) return [];
  const aliases = name === "نجع العرب والنجاجرة" ? ["العرب والنجاجرة"] : [];
  return getAreaRecords(area.slug).filter(r => r.neighborhood_canonical === name || r.locality.split(/\s*-\s*/).some(part => part === name || aliases.includes(part)));
}

export function getSearchableLocalityOptions(records: DirectoryRecord[]) {
  const ids = new Set(records.map(record => record.id));
  return localities.flatMap(locality => {
    const recordIds = getLocalityRecords(locality.name, locality.parentArea).filter(record => ids.has(record.id)).map(record => record.id);
    return recordIds.length ? [{name: locality.name, recordIds}] : [];
  });
}

export const areas = [
  { slug: "alwaqf", name: "مدينة الوقف", kicker: "قلب المركز", description: "الخدمات الحكومية، الصحة، التعليم، التجارة ومناطق المدينة وتجمعاتها.", accent: "مدينة" },
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
