# SEO and deployment

The primary domain is **https://www.vizcreative.work/** (singular `work`). The existing production branch is `master`; the public `Vizcreative.works` and `vizcreative.github.io` repositories are older sites and are not the source for this deployment.

Use `npm ci`, `npm run build`, `npm run lint`, then `npm run check:seo`. The production static export is in `out/`. Image optimization runs before development, standard builds and Sites builds. It reads CMS images, skips unpublished projects and inactive slideshow data, and generates hashed WebP variants plus `lib/generated-media.json`. Commit generated variants with source changes. Original uploads are retained. The 1200×630 sharing JPEG uses the existing hero image.

The sitemap includes the four public routes and only published projects. Drafts are excluded and retain not-found/noindex behavior. Each public page gets a canonical URL, social tags and structured data. CMS SEO fields remain editable. No project claims or testimonials were invented.

The owner supplied GA4 measurement ID **G-FFZM1273ED**. It loads after interactivity. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to override it at build time; an empty value disables it. Enable Analytics Enhanced Measurement for page loads and browser-history page changes, and verify visits in Realtime after deployment. Do not add manual page-view events alongside automatic history tracking. Set `GOOGLE_SITE_VERIFICATION` only if a new HTML verification tag is needed; keep any existing verification method in place.

`experimental.inlineCss` removes the initial blocking stylesheet request but increases HTML size and sacrifices separate stylesheet caching. Fonts remain self-hosted. GSAP loads separately; hero text stays readable while it loads. The existing video composition is preserved, with a responsive high-priority poster and a still-image fallback for reduced motion or data saving. Hashed WebP files receive immutable one-year cache headers through Vercel; replaceable original images have shorter caching.

The 27 October 2026 dependency audit reported zero vulnerabilities after compatible security updates to Next.js, Sharp, PostCSS and indirect dependencies. Recheck with `npm audit` before future releases.

After publishing, verify the Vercel deployment, page/404 statuses, social tags, image cache headers and Analytics script. Submit **https://www.vizcreative.work/sitemap.xml** in the correct Search Console property. Live performance and indexing need checking after deployment; byte savings do not establish a Lighthouse score or ranking improvement.
