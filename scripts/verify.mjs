import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { isPublishable } from '../lib/publish.ts';
import { normalizeSearch } from '../lib/search.ts';
import { hasPlaceScene, placeArtSrc } from '../lib/artwork.ts';
const master = JSON.parse(fs.readFileSync('data/master.json','utf8'));
const ready = master.records.filter(isPublishable);
assert.equal(ready.length,125);
for(const status of ['research_hold','verify_conflict','closed_ready_with_caution','unknown']) assert.equal(isPublishable({status,publish_ready:true}),false);
assert.equal(isPublishable({status:'closed_ready',publish_ready:false}),false);
assert.equal(normalizeSearch('إِسْعَاف'),normalizeSearch('اسعاف'));
assert.equal(new Set(master.records.map(r=>r.id)).size,master.records.length);
const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
for(const r of ready) assert(sitemap.includes(`/place/${r.id}`));
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
for(const r of master.records.filter(r=>!isPublishable(r))) {
 assert(!fs.existsSync(`public/places/${r.id}.svg`), `${r.id} has a non-public artwork`);
 assert(!fs.existsSync(`public/images/places/${r.id}.webp`), `${r.id} has a non-public scene`);
 assert(!sitemap.includes(`/place/${r.id}`));
 assert(!fs.existsSync(`.next/server/app/place/${r.id}.html`));
 for(const f of ['.next/server/app/index.html','.next/server/app/directory.html']) assert(!fs.readFileSync(f,'utf8').includes(r.id),`${r.id} leaked into ${f}`);
}
for(const f of fs.readdirSync('.next/static/chunks').filter(f=>f.endsWith('.js'))){
 const js=fs.readFileSync(`.next/static/chunks/${f}`,'utf8');
 for(const r of master.records.filter(r=>!isPublishable(r))) assert(!js.includes(r.id),`${r.id} leaked to client bundle`);
}
console.log(`PASS: ${ready.length} public records and unique illustrations; ${master.records.length-ready.length} excluded from pages, artwork, payloads, sitemap and client bundles; strict publication gate; normalized Arabic search.`);

for (const [name, ids] of Object.entries({"عزبة-وشاحي":["WK-045","WK-052"],"رنة-البهايجة":["WK-067","WK-068","WK-069"]})) {
 const html=fs.readFileSync(`.next/server/app/neighborhoods/${name}.html`,"utf8");
 for (const id of ids) assert(html.includes(`/place/${id}`),`${id} missing from ${name}`);
}
