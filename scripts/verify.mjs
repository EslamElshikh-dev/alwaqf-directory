import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { isPublishable } from '../lib/publish.ts';
import { normalizeSearch } from '../lib/search.ts';
import { hasPlaceScene, placeArtSrc } from '../lib/artwork.ts';
const master = JSON.parse(fs.readFileSync('data/master.json','utf8'));
const ready = master.records.filter(isPublishable);
assert.equal(ready.length,136);
for(const status of ['research_hold','verify_conflict','closed_ready_with_caution','unknown']) assert.equal(isPublishable({status,publish_ready:true}),false);
assert.equal(isPublishable({status:'closed_ready',publish_ready:false}),false);
assert.equal(normalizeSearch('إِسْعَاف'),normalizeSearch('اسعاف'));
assert.equal(new Set(master.records.map(r=>r.id)).size,master.records.length);
const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
for(const r of ready) assert(sitemap.includes(`/place/${r.id}`));
const homepage = fs.readFileSync('.next/server/app/index.html','utf8');
assert(!homepage.includes('الأحياء') && !homepage.includes('حيًا بحي'), 'The homepage still labels localities as neighborhoods');
assert(homepage.includes('نجوع وعزب ومواضع القرى'), 'Rural localities must be visible from the homepage');
for (const slug of ['alwaqf','almarashda','alqalamina','jazirat-alhamoudi']) {
 const image = `/images/areas/${slug}.webp`;
 assert(fs.existsSync(`public${image}`), `Missing area scene for ${slug}`);
 assert(homepage.includes(image), `Area scene missing from homepage for ${slug}`);
 const areaPage = fs.readFileSync(`.next/server/app/areas/${slug}.html`,'utf8');
 assert(areaPage.includes(image) && areaPage.includes('تصور فني · ليس صورة للمكان'), `Area scene or disclaimer missing from ${slug}`);
}
const artworkHashes = new Set();
for (const r of ready) {
 const file = `public/places/${r.id}.svg`;
 assert(fs.existsSync(file), `Missing artwork for ${r.id}`);
 const artwork = fs.readFileSync(file,'utf8');
 assert(artwork.includes(r.id), `Artwork identity missing for ${r.id}`);
 artworkHashes.add(createHash('sha256').update(artwork).digest('hex'));
 const selectedArt = placeArtSrc(r.id);
 assert(fs.existsSync(`public${selectedArt}`), `Missing selected artwork for ${r.id}`);
 const detail = fs.readFileSync(`.next/server/app/place/${r.id}.html`,'utf8');
 assert(detail.includes(selectedArt), `Artwork missing from detail page ${r.id}`);
 if (hasPlaceScene(r.id)) assert(detail.includes('تصور فني · ليس صورة للمكان'), `Scene disclaimer missing for ${r.id}`);
}
assert.equal(artworkHashes.size, ready.length, 'Artwork must not repeat between records');
const marashdaPage = fs.readFileSync('.next/server/app/areas/almarashda.html','utf8');
for (const id of ['MR-001','MR-002','MR-003','MR-004','MR-005','MR-006','MR-007','MR-009']) {
 assert(ready.some(r=>r.id===id), `${id} must be public before featuring it`);
 assert(marashdaPage.includes(`/place/${id}`) && marashdaPage.includes(`/images/places/${id}.webp`), `${id} missing from the Al-Marashda visual route`);
}
assert(marashdaPage.includes('الصور تصورات فنية للفئات'), 'The visual route must identify the scenes as artwork');
for(const r of master.records.filter(r=>!isPublishable(r))) {
 assert(!fs.existsSync(`public/places/${r.id}.svg`), `${r.id} has a non-public artwork`);
 assert(!fs.existsSync(`public/images/places/${r.id}.webp`), `${r.id} has a non-public scene`);
 assert(!sitemap.includes(`/place/${r.id}`));
 assert(!fs.existsSync(`.next/server/app/place/${r.id}.html`));
 for(const f of ['.next/server/app/index.html','.next/server/app/directory.html','.next/server/app/areas/almarashda.html', ...fs.readdirSync('.next/server/app/localities',{recursive:true}).filter(f=>f.endsWith('.html')).map(f=>`.next/server/app/localities/${f}`)]) assert(!fs.readFileSync(f,'utf8').includes(r.id),`${r.id} leaked into ${f}`);
}
for(const f of fs.readdirSync('.next/static/chunks').filter(f=>f.endsWith('.js'))){
 const js=fs.readFileSync(`.next/static/chunks/${f}`,'utf8');
 for(const r of master.records.filter(r=>!isPublishable(r))) assert(!js.includes(r.id),`${r.id} leaked to client bundle`);
}
console.log(`PASS: ${ready.length} public records and unique illustrations; ${master.records.length-ready.length} excluded from pages, artwork, payloads, sitemap and client bundles; strict publication gate; normalized Arabic search.`);

for (const [name, ids] of Object.entries({"عزبة-وشاحي":["WK-045","WK-052"],"رنة-البهايجة":["WK-067","WK-068","WK-069"],"عزبة-علام":["MR-010"],"نجع-الجنينة":["MR-058"],"نجع-العرب-والنجاجرة":["MR-049","MR-056"],"عزبة-داوود":["QL-015"],"كوبري-عبادي":["MR-050"],"البدراوية":["WK-007"],"الشابورة":["WK-011"],"المشتل":["WK-005"],"الوقف-الجديدة":["WK-022","WK-042","WK-077"]})) {
 const html=fs.readFileSync(`.next/server/app/localities/${name}.html`,"utf8");
 for (const id of ids) assert(html.includes(`/place/${id}`),`${id} missing from ${name}`);
 assert(sitemap.includes(`/localities/${encodeURIComponent(name)}`),`${name} missing from sitemap`);
}
const mandara = fs.readFileSync('.next/server/app/localities/مندرة-الفولي.html','utf8');
assert(mandara.includes('لا توجد أنشطة جاهزة للنشر') && mandara.includes('www.itda.gov.eg/CRM/883/CRA119.pdf'));
assert(sitemap.includes('/localities/%D9%85%D9%86%D8%AF%D8%B1%D8%A9-%D8%A7%D9%84%D9%81%D9%88%D9%84%D9%8A'));
assert(fs.readFileSync('.next/server/app/directory.html','utf8').includes('التجمع المحلي'), 'The directory must expose a locality filter');
assert(!sitemap.includes('/neighborhoods/'), 'Legacy locality paths must not enter the sitemap');
