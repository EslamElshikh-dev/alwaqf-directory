import fs from 'node:fs';
import path from 'node:path';
import { isPublishable } from '../lib/publish.ts';

// These are editorial illustrations, never representations of an actual shop or building.
// Only the strict public subset gets an asset. The source data remains untouched.
const master = JSON.parse(fs.readFileSync('data/master.json', 'utf8'));
const records = master.records.filter(isPublishable);
const output = 'public/places';
fs.mkdirSync(output, { recursive: true });

const symbols = {
  pharmacy: '<rect x="30" y="30" width="60" height="67" rx="11"/><path d="M43 30v-8h34v8M60 45v37M42 64h36"/><path d="M41 97h38"/>',
  medical: '<path d="M28 37h64v59H28zM40 37V25h40v12M60 52v29M46 66h28"/><path d="M37 96h46"/>',
  speech: '<path d="M22 25h76v49H71L53 92V74H22V25Z"/><path d="M36 43h48M36 56h29"/><path d="M29 99c8-10 19-13 31-13s23 3 31 13"/>',
  dental: '<path d="M33 29c10-7 18-2 27 0 9-2 17-7 27 0 10 8 3 24 0 34-3 12-6 35-17 35-8 0-5-22-10-22s-2 22-10 22c-11 0-14-23-17-35-3-10-10-26 0-34Z"/>',
  school: '<path d="m20 48 40-22 40 22v49H20zM30 48h60M44 60h12v14H44zM64 60h12v14H64zM53 97V82h14v15M60 26V16m0 0h16"/>',
  library: '<path d="M25 35q17-7 35 4 18-11 35-4v57q-18-6-35 6-17-12-35-6zM60 39v59M33 46q10-3 19 2m-19 9q10-2 19 2m16-11q10-5 19-2m-19 13q10-4 19-2"/>',
  mosque: '<path d="M28 98V60c0-18 17-25 32-39 15 14 32 21 32 39v38ZM20 98h80M48 98V74a12 12 0 0 1 24 0v24M14 98V35m0 0-5-6 5-6 5 6-5 6Zm92 63V35m0 0-5-6 5-6 5 6-5 6Z"/>',
  church: '<path d="M29 98V45l31-18 31 18v53M24 98h72M60 29V12m-9 9h18M48 98V72a12 12 0 0 1 24 0v26M38 54h8v12h-8zm36 0h8v12h-8z"/>',
  market: '<path d="M25 50h70l-6 48H31zM22 50l8-24h60l8 24M40 26v24m20-24v24m20-24v24M47 98V68h26v30M25 56c7 8 14 8 21 0 7 8 14 8 21 0 7 8 14 8 21 0"/>',
  bakery: '<path d="M24 92c0-19 14-31 36-31s36 12 36 31H24ZM31 91c3-11 14-19 29-19s26 8 29 19M44 61c-7-13-4-23 8-32m8 32c-5-13-1-24 9-32m7 32c-2-13 3-22 11-29"/>',
  dining: '<path d="M20 73c2 18 17 26 40 26s38-8 40-26H20ZM27 73h66M35 31v28m-7-28v17c0 7 4 11 7 11s7-4 7-11V31m36 0c9 13 10 24 1 35V99"/>',
  cafe: '<path d="M23 45h62v25c0 19-11 29-31 29S23 89 23 70V45Zm62 7h8c16 0 15 21-8 23M36 33c-6-8 7-12 0-20m20 20c-6-8 7-12 0-20m20 20c-6-8 7-12 0-20"/>',
  finance: '<path d="m19 48 41-24 41 24H19Zm7 50h68M32 54v35m19-35v35m18-35v35m19-35v35M21 91h78"/><circle cx="60" cy="37" r="5"/>',
  mail: '<rect x="22" y="35" width="76" height="57" rx="6"/><path d="m23 41 37 28 37-28M23 87l29-24m45 24L68 63"/>',
  civic: '<path d="m18 47 42-25 42 25M24 49h72v48H24zM33 56h15v17H33zm39 0h15v17H72zM52 97V78h16v19M18 98h84"/>',
  emergency: '<path d="M18 49h57v42H18zM75 61h12l15 17v13H75M29 91a9 9 0 1 0 18 0m39 0a9 9 0 1 0 18 0M44 58v23M32 69h24"/>',
  police: '<path d="m60 19 35 13v26c0 20-13 35-35 45C38 93 25 78 25 58V32zM60 38v40m-18-21h36"/>',
  sport: '<circle cx="60" cy="62" r="39"/><path d="m60 37 17 11-6 20H49l-6-20zm-17 11-16-6m22 26-13 19m35-19 13 19m-7-39 16-6"/>',
  farm: '<path d="M20 98h80M60 97V24m0 21C43 29 34 30 25 37c11 15 25 16 35 8Zm0 16c17-16 26-16 35-8-11 14-25 17-35 8Zm-1 17C44 64 34 65 25 70c11 15 24 17 34 8Z"/>',
  utility: '<path d="M26 95h68V51H26zM34 51V29h52v22M43 65h34M43 77h34M60 51v44M20 95h80"/><path d="M60 16c-10 9-13 15-13 21a13 13 0 0 0 26 0c0-6-3-12-13-21Z"/>',
  telecom: '<rect x="37" y="15" width="46" height="90" rx="9"/><path d="M47 26h26M48 90h24"/><circle cx="60" cy="98" r="2"/><path d="M26 47a46 46 0 0 1 8-26m60 26a46 46 0 0 0-8-26"/>',
  electric: '<path d="M64 19 30 65h27l-7 37 40-52H62z"/><path d="M22 33h17m42 66h17"/>',
  automotive: '<path d="m26 73 8-25h52l8 25v19H26zM34 48l8-15h36l8 15M30 70h60M39 92v8m42-8v8"/><circle cx="39" cy="78" r="4"/><circle cx="81" cy="78" r="4"/>',
  hardware: '<path d="m24 93 51-51m-8-9 9-9 18 18-9 9M24 93l-5 10 10-5M50 46l24 24M38 58l24 24"/>',
  furniture: '<path d="M27 39h66v40H27zM27 79h66v14H27zM34 93v11m52-11v11M36 39V27h48v12M40 52h13m14 0h13"/>',
  plumbing: '<path d="M27 28h66v19H27zM60 47v20M36 68h48M36 68v15a24 24 0 0 0 48 0V68M60 72c-9 12-12 18-12 22a12 12 0 0 0 24 0c0-4-3-10-12-22Z"/>',
  key: '<circle cx="43" cy="43" r="21"/><circle cx="43" cy="43" r="8"/><path d="m59 58 41 41M83 82l-9 9m18 0-8 8"/>',
  bridge: '<path d="M13 93h94M19 65c16-21 66-21 82 0M19 65v28m82-28v28M32 60v33m28-39v39m28-33v33M15 76h90"/>',
  construction: '<path d="M25 98V42h70v56M20 98h80M33 42l27-23 27 23M39 56h16v16H39zm26 0h16v16H65zM53 98V79h14v19"/>',
  herbs: '<path d="M60 101V28m0 30C37 30 24 40 27 55c12 12 25 13 33 3Zm0 16c18-28 33-24 37-8-8 15-25 22-37 8ZM47 101h26"/>',
};

// The larger families receive distinct subjects, not just a recolored copy.
const subjects = {
  pharmacy: [
    symbols.pharmacy,
    '<path d="m37 31 46 46a18 18 0 0 1-25 25L12 56a18 18 0 0 1 25-25ZM25 68l26-26M69 37l24 24"/>',
    '<rect x="29" y="38" width="62" height="62" rx="10"/><path d="M40 38V23h40v15M60 52v35M45 69h30"/>',
    '<path d="M28 93h64M44 36h32l-5 16H49zM49 52h22v41H49zM54 27h12M55 77h10"/><circle cx="60" cy="64" r="5"/>',
    '<path d="M30 84c2 16 13 24 30 24s28-8 30-24H30ZM37 84h46M70 18 45 60m19-39 12 13M47 59l-7 10"/>',
    '<rect x="22" y="34" width="76" height="65" rx="9"/><path d="M48 34V23h24v11M60 48v37M42 66h36"/>',
    '<rect x="27" y="24" width="66" height="79" rx="8"/><circle cx="46" cy="45" r="7"/><circle cx="72" cy="45" r="7"/><circle cx="46" cy="71" r="7"/><circle cx="72" cy="71" r="7"/>',
    '<path d="M38 38h44v64H38zM46 38V25h28v13M60 58c-9 11-13 19-13 26a13 13 0 0 0 26 0c0-7-4-15-13-26Z"/>',
    '<path d="M33 20h54v82H33zM42 35h36M42 47h23M42 59h15M60 73v21M49 84h22"/>',
    '<path d="M55 20h10v45H55zM49 65h22v25a11 11 0 0 1-22 0V65ZM45 98h30M37 38h18M65 38h18"/>',
  ],
  market: [
    symbols.market,
    '<path d="M25 52h70l-8 50H33zM33 52l9-22h36l9 22M43 69h34"/><circle cx="48" cy="80" r="7"/><circle cx="72" cy="83" r="8"/>',
    '<path d="M30 35h60l7 63H23zM42 35c0-25 36-25 36 0M42 58h36M48 75h24"/>',
    '<path d="M22 36h76v19H22zM29 55v44h62V55M42 36v19m18-19v19m18-19v19M44 99V70h32v29"/>',
    '<path d="M22 97h76M60 25v72M30 48h60M32 49l-12 28h24L32 49Zm56 0L76 77h24L88 49Z"/>',
    '<path d="M21 35h14l10 48h49M48 83h43M56 96a5 5 0 1 0 10 0m18 0a5 5 0 1 0 10 0M45 47h47l-6 28H51"/>',
    '<path d="M25 88h70M31 88V47h58v41M35 47l10-21h30l10 21M41 61h38M43 75h12m10 0h12"/>',
    '<path d="M26 93h68M34 93V38h52v55M42 38V27h36v11M43 57h34M43 73h34"/><circle cx="51" cy="64" r="4"/><circle cx="69" cy="80" r="4"/>',
    '<path d="M22 95h76M35 95V54h50v41M44 54V32h32v22M43 69h34M50 83h20"/>',
    '<path d="M20 95h80M29 95V46h62v49M25 46l9-19h52l9 19M39 61h12v17H39zm30 0h12v17H69z"/>',
  ],
  school: [
    symbols.school, symbols.library,
    '<path d="M28 95 47 28l12 3-19 67ZM47 28l6-13 6 16M57 95l19-67 12 3-19 67ZM76 28l6-13 6 16"/>',
    '<path d="M20 76h80M27 76V39h66v37M37 95V77m46 18V77M39 49h42M48 61h24"/>',
    '<path d="M20 25h80v60H20zM28 91h64M60 85v13M35 42h49M35 55h31M35 68h40"/>',
    '<path d="M32 42a28 28 0 0 1 56 0v57H32V42Zm0 16h56M48 72h24M45 99v-9m30 9v-9"/>',
    '<path d="M22 95h76M30 82 60 26l30 56H30Zm30-56v56M40 78h40"/>',
    '<rect x="33" y="22" width="54" height="78" rx="5"/><path d="M43 22v78M50 38h27M50 53h20M50 68h27"/>',
  ],
  mosque: [
    symbols.mosque,
    '<path d="M22 97h76M35 97V52c0-16 16-24 25-32 9 8 25 16 25 32v45M49 97V69a11 11 0 0 1 22 0v28M16 97V25m88 72V25"/>',
    '<path d="M22 96V56h76v40M22 56c8-20 23-31 38-42 15 11 30 22 38 42M44 96V73a16 16 0 0 1 32 0v23M16 96h88"/>',
    '<path d="M19 98h82M29 98V45h62v53M37 45C42 31 51 26 60 18c9 8 18 13 23 27M49 98V72a11 11 0 0 1 22 0v26"/>',
    '<path d="M18 95h84M32 95V48h56v47M36 48q24-38 48 0M47 95V68q13-20 26 0v27M12 95V25m96 70V25"/>',
    '<path d="M24 97h72M29 97V48h62v49M29 48 60 25l31 23M46 62h28M60 62v35M13 97V30m94 67V30"/>',
  ],
};

function kind(category) {
  if (/تخاطب|تأهيل/.test(category)) return 'speech';
  if (/صيدلية/.test(category)) return 'pharmacy';
  if (/أسنان/.test(category)) return 'dental';
  if (/مستشفى|صحة|طبي/.test(category)) return 'medical';
  if (/مسجد/.test(category)) return 'mosque';
  if (/كنيسة/.test(category)) return 'church';
  if (/مكتبة|ثقافة/.test(category)) return 'library';
  if (/تعليم/.test(category)) return 'school';
  if (/مخبز|مطحن/.test(category)) return 'bakery';
  if (/مطعم|مشويات|حلويات|دجاج/.test(category)) return 'dining';
  if (/كافيه|مقهى/.test(category)) return 'cafe';
  if (/سوبرماركت|بقالة|سوق|تموين/.test(category)) return 'market';
  if (/طوارئ|إسعاف/.test(category)) return 'emergency';
  if (/شرطة/.test(category)) return 'police';
  if (/صراف|تمويل/.test(category)) return 'finance';
  if (/بريد/.test(category)) return 'mail';
  if (/خدمات حكومية|إدارة/.test(category)) return 'civic';
  if (/شباب|رياضة/.test(category)) return 'sport';
  if (/زراعية/.test(category)) return 'farm';
  if (/كوبري/.test(category)) return 'bridge';
  if (/مياه|صرف|مرافق/.test(category)) return 'utility';
  if (/سباكة|أدوات صحية/.test(category)) return 'plumbing';
  if (/اتصالات|هواتف|إلكترونيات/.test(category)) return 'telecom';
  if (/كهرباء|إنارة|أجهزة كهربائية/.test(category)) return 'electric';
  if (/سيارات|دراجات|قطع غيار/.test(category)) return 'automotive';
  if (/مفاتيح|أقفال/.test(category)) return 'key';
  if (/أثاث|أخشاب/.test(category)) return 'furniture';
  if (/حدايد|خردوات/.test(category)) return 'hardware';
  if (/مقاولات|إنشاء/.test(category)) return 'construction';
  if (/عطارة/.test(category)) return 'herbs';
  return 'civic';
}

function hash(value) {
  let n = 2166136261;
  for (const ch of value) n = Math.imul(n ^ ch.charCodeAt(0), 16777619);
  return n >>> 0;
}

const palettes = [
  ['#e5eee7', '#b8d2bf', '#1c6859', '#a77a46'],
  ['#f4ead8', '#dfcba6', '#805f3f', '#386a58'],
  ['#e5eeeb', '#a8cac4', '#206c6c', '#b78e55'],
  ['#f2e8df', '#d8c6af', '#775e4d', '#557e65'],
  ['#e7ebdd', '#cad5b2', '#4d6d4f', '#b18b50'],
  ['#edf0e5', '#c8d8c5', '#245f50', '#c39a68'],
  ['#e8e5da', '#d3c6ae', '#536b61', '#ad794e'],
  ['#e2ebef', '#b3ced1', '#356b78', '#b58d54'],
];

function artwork(record, ordinal) {
  const seed = hash(`${record.id}:${record.name_ar}:${record.category}`);
  const [paper, pale, ink, gold] = palettes[seed % palettes.length];
  const theme = kind(record.category);
  const shift = seed % 61 - 30;
  const variant = seed % 4;
  const x = [202, 293, 390, 305][variant] + Math.round(shift / 3);
  const y = [178, 168, 176, 165][variant] + ((seed >>> 6) % 17 - 8);
  const orbit = 34 + (seed % 6) * 13;
  const wheel = [0, 1, 2, 3, 4].map(i => `<circle cx="${38 + i * (17 + seed % 5)}" cy="${278 - (i % 2) * 10}" r="${2 + (i % 3)}" fill="${gold}" opacity=".45"/>`).join('');
  const landscape = (seed & 1)
    ? `<path d="M0 265Q145 ${239 + shift} 286 276T600 250v90H0Z" fill="${pale}" opacity=".72"/>`
    : `<path d="M0 275Q122 ${290 - shift} 252 260T600 281v59H0Z" fill="${pale}" opacity=".75"/>`;
  const houses = [0, 1, 2].map((i) => {
    const hx = (x > 340 ? 42 : 375) + i * 62 + ((seed >>> (i + 9)) % 11);
    const height = 28 + ((seed >>> (i + 14)) % 20);
    return `<path d="M${hx} 277v-${height}l22-12 22 12v${height}" fill="none" stroke="${ink}" stroke-width="2" opacity=".28"/><path d="M${hx+11} ${277-height+12}h10v11h-10" fill="none" stroke="${ink}" stroke-width="1.5" opacity=".3"/>`;
  }).join('');
  const stripes = Array.from({ length: 5 }, (_, i) => `<path d="M${-30+i*orbit} 12C${180+i*15} ${-28+shift} ${355-i*9} ${90+i*orbit} 632 ${19+i*orbit}" fill="none" stroke="${ink}" opacity=".065"/>`).join('');
  const shape = variant === 0 || variant === 3
    ? `<rect x="${x-102}" y="${y-105}" width="204" height="204" rx="48" fill="${paper}" transform="rotate(-8 ${x} ${y})" filter="url(#shadow)"/>`
    : `<circle cx="${x}" cy="${y}" r="108" fill="${paper}" filter="url(#shadow)"/>`;
  const subject = subjects[theme]?.[ordinal % subjects[theme].length] || symbols[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="600" height="340">
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${paper}"/><stop offset="1" stop-color="${pale}"/></linearGradient><filter id="shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="13" stdDeviation="15" flood-color="${ink}" flood-opacity=".14"/></filter></defs>
<rect width="600" height="340" fill="url(#bg)"/>${stripes}
<circle cx="${497 - shift}" cy="86" r="43" fill="${gold}" opacity=".24"/><circle cx="${497 - shift}" cy="86" r="28" fill="${gold}" opacity=".2"/>
<path d="M0 246C124 ${228+shift} 175 263 293 249s175-34 307-2" fill="none" stroke="${ink}" stroke-width="1.4" opacity=".27"/>
${landscape}${houses}${wheel}
<path d="M35 246v-61m0 12c-17-21-28-14-34-5m34 5c8-22 22-24 32-17m-32 17c18-8 30-5 36 5" fill="none" stroke="${ink}" stroke-width="2.5" stroke-linecap="round" opacity=".31"/>
${shape}<circle cx="${x}" cy="${y}" r="87" fill="none" stroke="${gold}" stroke-width="1.7" opacity=".55"/>
<g transform="translate(${x-84} ${y-84}) scale(1.4)" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${subject}</g>
<path d="M22 28h75" stroke="${ink}" stroke-width="2" opacity=".36"/><circle cx="110" cy="28" r="4" fill="${gold}"/>
<path d="M22 315h556" stroke="${ink}" stroke-width="1" opacity=".24"/><text x="24" y="304" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="${ink}" opacity=".75">${record.id}</text>
<circle cx="550" cy="304" r="9" fill="none" stroke="${ink}" opacity=".45"/><circle cx="550" cy="304" r="3" fill="${gold}"/>
</svg>`;
}

const themeCount = new Map();
for (const record of records) {
  if (!/^[A-Z]{2}-\d+$/.test(record.id)) throw new Error(`Unexpected record id: ${record.id}`);
  const theme = kind(record.category);
  const ordinal = themeCount.get(theme) || 0;
  themeCount.set(theme, ordinal + 1);
  fs.writeFileSync(path.join(output, `${record.id}.svg`), artwork(record, ordinal));
}
console.log(`Generated ${records.length} distinct editorial SVGs in ${output}`);
