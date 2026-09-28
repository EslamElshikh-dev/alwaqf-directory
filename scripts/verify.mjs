import assert from 'node:assert/strict';
import fs from 'node:fs';
import { isPublishable } from '../lib/publish.ts';
import { normalizeSearch } from '../lib/search.ts';
const master = JSON.parse(fs.readFileSync('data/master.json','utf8'));
const ready = master.records.filter(isPublishable);
assert.equal(ready.length,125);
for(const status of ['research_hold','verify_conflict','closed_ready_with_caution','unknown']) assert.equal(isPublishable({status,publish_ready:true}),false);
assert.equal(isPublishable({status:'closed_ready',publish_ready:false}),false);
assert.equal(normalizeSearch('إِسْعَاف'),normalizeSearch('اسعاف'));
assert.equal(new Set(master.records.map(r=>r.id)).size,master.records.length);
const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
for(const r of ready) assert(sitemap.includes(`/place/${r.id}`));
for(const r of master.records.filter(r=>!isPublishable(r))) {
 assert(!sitemap.includes(`/place/${r.id}`));
 assert(!fs.existsSync(`.next/server/app/place/${r.id}.html`));
 for(const f of ['.next/server/app/index.html','.next/server/app/directory.html']) assert(!fs.readFileSync(f,'utf8').includes(r.id),`${r.id} leaked into ${f}`);
}
for(const f of fs.readdirSync('.next/static/chunks').filter(f=>f.endsWith('.js'))){
 const js=fs.readFileSync(`.next/static/chunks/${f}`,'utf8');
 for(const r of master.records.filter(r=>!isPublishable(r))) assert(!js.includes(r.id),`${r.id} leaked to client bundle`);
}
console.log(`PASS: ${ready.length} public records; ${master.records.length-ready.length} excluded from pages, payloads, sitemap and client bundles; strict publication gate; normalized Arabic search.`);

for (const [name, ids] of Object.entries({"عزبة-وشاحي":["WK-045","WK-052"],"رنة-البهايجة":["WK-067","WK-068","WK-069"]})) {
 const html=fs.readFileSync(`.next/server/app/neighborhoods/${name}.html`,"utf8");
 for (const id of ids) assert(html.includes(`/place/${id}`),`${id} missing from ${name}`);
}
