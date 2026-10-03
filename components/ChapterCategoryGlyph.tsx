type Kind = "market" | "school" | "health" | "mosque" | "finance" | "family" | "civic" | "place";

function kindFor(category: string): Kind {
  if (/سوبرماركت|سوق|مخبز|مطعم/.test(category)) return "market";
  if (/تعليم|مدرسة/.test(category)) return "school";
  if (/صيدلية|صحة|مستشفى|إسعاف/.test(category)) return "health";
  if (/مسجد/.test(category)) return "mosque";
  if (/صراف|بريد|تمويل/.test(category)) return "finance";
  if (/تنمية|تضامن/.test(category)) return "family";
  if (/حكومية|زراعية/.test(category)) return "civic";
  return "place";
}

export default function ChapterCategoryGlyph({ category }: { category: string }) {
  const kind = kindFor(category);
  return <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="40" cy="40" r="31" strokeWidth=".7" opacity=".24" />
    <circle cx="40" cy="40" r="25" strokeWidth=".7" opacity=".12" />
    {kind === "market" && <>
      <path d="M20 33h40l-3-12H23l-3 12ZM25 36v22h30V36M20 33c3 5 7 5 10 0 3 5 7 5 10 0 3 5 7 5 10 0 3 5 7 5 10 0" />
      <path d="M34 58V44h12v14M20 60h40" />
    </>}
    {kind === "school" && <>
      <path d="M17 29c8-3 16-2 23 2 7-4 15-5 23-2v28c-8-2-16-1-23 3-7-4-15-5-23-3V29ZM40 31v29M24 37c4-1 7-1 10 1m-10 6c4-1 7-1 10 1m12-7c3-2 6-2 10-1m-10 8c3-2 6-2 10-1" />
      <path d="M40 24v-6m-5 3h10" strokeWidth="1.5" />
    </>}
    {kind === "health" && <>
      <path d="M34 20h12v13h13v13H46v13H34V46H21V33h13V20Z" />
      <path d="M16 67h13l5-7 6 10 6-8 4 5h14" strokeWidth="1.5" />
    </>}
    {kind === "mosque" && <>
      <path d="M22 59h36M27 59V39c0-7 8-11 13-17 5 6 13 10 13 17v20M34 59V45a6 6 0 0 1 12 0v14M18 59V31m44 28V31M16 31l2-4 2 4m40 0 2-4 2 4" />
      <path d="M40 22v-7" strokeWidth="1.5" />
    </>}
    {kind === "finance" && <>
      <path d="M20 31 40 20l20 11v4H20v-4ZM24 35v22m10-22v22m12-22v22m10-22v22M19 58h42v4H19v-4Z" />
      <path d="M37 29h6" strokeWidth="1.5" />
    </>}
    {kind === "family" && <>
      <path d="M17 35 40 19l23 16M22 34v26h36V34M32 60V46a8 8 0 0 1 16 0v14" />
      <circle cx="40" cy="36" r="4" /><path d="M34 51c0-4 3-7 6-7s6 3 6 7" strokeWidth="1.5" />
    </>}
    {kind === "civic" && <>
      <path d="M19 32 40 20l21 12v4H19v-4ZM24 36v24m10-24v24m12-24v24m10-24v24M19 60h42" />
      <path d="M35 28h10M40 22v-5" strokeWidth="1.5" />
    </>}
    {kind === "place" && <>
      <path d="M40 63s18-16 18-29a18 18 0 1 0-36 0c0 13 18 29 18 29Z" /><circle cx="40" cy="34" r="6" />
      <path d="M26 62c8 5 20 5 28 0" strokeWidth="1.5" />
    </>}
  </svg>;
}
