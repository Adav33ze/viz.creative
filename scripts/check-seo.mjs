import assert from 'node:assert/strict'
import {readFile,access} from 'node:fs/promises'
import path from 'node:path'

const origin='https://www.vizcreative.work'
const root=path.resolve('out')
const projects=JSON.parse(await readFile('data/portfolio.json','utf8')).projects
const expected=['/','/work/','/services/','/about/',...projects.filter(p=>p.published).map(p=>`/work/${p.slug}/`)].map(p=>origin+p)
const sitemap=await readFile('out/sitemap.xml','utf8')
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])
assert.deepEqual(new Set(urls),new Set(expected),'Sitemap must include all published pages and exclude drafts')
assert.equal(urls.length,new Set(urls).size,'Duplicate sitemap URL')
const attr=(tag,name)=>tag.match(new RegExp(`\\s${name}="([^"]*)"`,'i'))?.[1]
const decode=s=>s.replace(/&amp;/g,'&')
const localFile=url=>{const p=decodeURIComponent(new URL(url,origin).pathname);return path.join(root,p,path.extname(p)?'':'index.html')}
const titles=new Set()
let images=0
for(const url of urls){
  const html=await readFile(localFile(url),'utf8')
  const title=html.match(/<title>(.*?)<\/title>/)?.[1]
  assert(title&&!titles.has(title),`Missing or duplicate title: ${url}`);titles.add(title)
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,`Expected one H1: ${url}`)
  const links=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>m[0])
  const canonical=links.find(t=>attr(t,'rel')==='canonical')
  assert.equal(decode(attr(canonical||'','href')||''),url,`Wrong canonical: ${url}`)
  assert(!links.some(t=>attr(t,'rel')==='stylesheet'),`Blocking stylesheet: ${url}`)
  const metas=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0])
  for(const name of ['description','og:title','og:description','og:url','og:image','twitter:card','twitter:image'])assert(metas.some(t=>(attr(t,'name')===name||attr(t,'property')===name)&&attr(t,'content')),`Missing ${name}: ${url}`)
  for(const tag of metas.filter(t=>['og:image','twitter:image'].includes(attr(t,'property')||attr(t,'name'))))await access(localFile(decode(attr(tag,'content'))))
  assert(!metas.some(t=>attr(t,'name')==='robots'&&attr(t,'content')?.includes('noindex')),`Published page is noindex: ${url}`)
  const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  assert(schema.length,`Missing structured data: ${url}`);schema.forEach(m=>JSON.parse(m[1]))
  for(const [tag]of html.matchAll(/<img\b[^>]*>/g)){
    images++
    assert(attr(tag,'alt')!==undefined,`Missing image alt attribute: ${url}`)
    assert(Number(attr(tag,'width'))>0&&Number(attr(tag,'height'))>0,`Missing dimensions: ${url}`)
    const src=decode(attr(tag,'src')||'');assert(src.endsWith('.webp'),`Image is not WebP: ${src}`)
    await access(localFile(src));assert(attr(tag,'sizes')&&attr(tag,'srcset'),`Missing responsive image: ${src}`)
    for(const variant of attr(tag,'srcset').split(', '))await access(localFile(variant.split(' ')[0]))
  }
  for(const [tag]of html.matchAll(/<a\b[^>]*>/g)){const href=decode(attr(tag,'href')||'');if(href.startsWith('/')&&!href.startsWith('//'))await access(localFile(href))}
}
const missing=await readFile('out/404.html','utf8')
assert(missing.includes('This page is outside the frame.')&&missing.includes('noindex'),'Invalid custom 404')
assert(!missing.includes('rel="canonical"'),'404 must not inherit a home canonical')
assert((await readFile('out/robots.txt','utf8')).includes(`${origin}/sitemap.xml`),'Wrong robots sitemap')
const manifest=JSON.parse(await readFile('out/manifest.json','utf8'));for(const icon of manifest.icons)await access(localFile(icon.src))
console.log(`SEO checks passed: ${urls.length} published pages, ${images} responsive images, metadata, social images, schema, links, draft exclusion, manifest, sitemap/robots and 404.`)
