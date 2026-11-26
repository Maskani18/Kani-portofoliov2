# KANI — Product Requirements Document

**Status:** Fase 2 — Gerbang 1 (Approval Required)  
**Last Updated:** 30 Okt 2026

---

## 1. Ringkasan & Tujuan

**Kani** adalah web portofolio pribadi untuk **Maskani**, fresh graduate D4 Rekayasa Perangkat Lunak dari Politeknik Negeri Indramayu. 

**Target pembaca:** Recruiter / HR / pengambil keputusan bidang IT Support, Technical Support, IT Helpdesk, Desktop Support (entry-level).

**Tujuan utama:** Dipanggil untuk wawancara IT Support / Technical Support dengan menampilkan:
- Pengalaman praktis troubleshooting hardware/software, konfigurasi Windows, printer, jaringan (MikroTik)
- Pengalaman QA (manual testing, UAT, bug reporting)
- Sertifikasi & pelatihan networking (VSGA, Red Hat RH124, HMTI leadership)
- Project portfolio (SIDALEKAS frontend, KMETRIC thesis) sebagai *nilai tambah*, bukan fokus
- Positioning: **IT Support/Technical Support** (utama) ← **Frontend & QA** (supporting)

---

## 2. Prinsip Sinkronisasi

### IDENTIK dengan template acuan (tidak ada perubahan):
- **Tech stack:** React 19 + Vite + TypeScript (strict)
- **Framework & routing:** React Router + vite-plugin-pages (file-based)
- **Styling:** Tailwind v4 (`@tailwindcss/vite`), CSS custom properties (no Tailwind config override)
- **Library & versi:** Exact match dengan template acuan/package.json (GSAP, react-helmet-async, qrcode.react, react-google-recaptcha)
- **Backend:** Express 4 (Node 24.x), CommonJS, struktur identik
- **Design tokens:** Dark theme (dark canvas, dot grid), light mode toggle (optional)
- **Animasi & interaksi:** Dot portrait, GSAP hero intro, column-curtain transitions, scroll reveals, magnetic buttons, cursor effects — durasi/easing identik
- **Font:** System UI sans-serif (atau custom font jika template acuan punya)
- **Icon:** Skill logos (SVG mask), sama source
- **Responsivitas:** Mobile-first, 320–1920px, bottom-sheet modals
- **SEO/AEO/GEO:** Per-route static HTML, sitemap/robots/llms.txt/manifest, JSON-LD (Person, FAQPage, HowTo, ItemList), build-time generation

### BERBEDA (konten & identitas saja):
- **Nama & branding:** Maskani (bukan template acuan)
- **Domain:** https://maskani.my.id (bukan maskani.my.id)
- **Konten:** Profil, bio, pengalaman (3 item), pendidikan, skill (5 grup), project (2 item), sertifikat (2 item), kontak, sosial
- **Heading & positioning:** "IT Support | Troubleshooting | Networking" (bukan "AI & Software Engineer")
- **CV/PDF:** Maskani (bukan Maskani)
- **Foto:** Maskani portrait (bukan template acuan)
- **Favicon, OG image, meta:** Maskani branding
- **Backend config:** identity.js, social.js, crypto.js → Maskani data
- **AI assistant persona:** Menjawab sebagai asisten Maskani, fokus IT Support (bukan general)
- **Bahasa:** Bahasa Indonesia (EN/ID toggle opsional)

---

## 3. Content Information Map

Per-section, diurut seperti template acuan (Home → Projects → Career → Certificates → Contact → Linktree).

| Section | Tujuan | Data yang Ditampilkan | Sumber | Status |
|---------|--------|----------------------|--------|--------|
| **Hero** | First impression, credibility | Nama (Maskani), headline (IT Support \| Troubleshooting \| Networking), bio 1 kalimat, foto cutout, CTA (projects + WhatsApp), scroll hint | porto-maskani: profile.ts, hero.ts, about.ts | ✅ Lengkap |
| **About** | Positioning & background | Bio lengkap (D4 Rekayasa Perangkat Lunak, Politeknik Negeri Indramayu, IPK 3.55/4.00), highlights (IT Support, hardware, Windows, MikroTik, QA, problem solving) | porto-maskani: about.ts, education.ts | ✅ Lengkap |
| **Experience** | Work history | 3 roles: IT Support (Dirgantara Oct 2019–Jan 2020), QA Intern (Qtasnim Jul–Oct 2025), Frontend Dev Intern (Diskominfo Okt–Des 2025) | porto-maskani: experience.ts | ✅ Lengkap |
| **Skills** | Technical & professional | 5 grup: IT Support, Networking, QA, Frontend & Dev, Tools & Documentation (Trello, Git, Excel, Word, Tech Docs) | porto-maskani: skills.ts | ✅ Lengkap |
| **Projects** | Portfolio showcase | 2 projects: (1) SIDALEKAS (Frontend Dev, React/Tailwind/Axios, Diskominfo), (2) KMETRIC (Skripsi, Laravel/React/PostgreSQL/MikroTik API, Politeknik) — dengan screenshot 3x | porto-maskani: projects/\*/index.ts | ✅ Lengkap |
| **Education** | Credentials & formal study | Degree (D4 Rekayasa Perangkat Lunak, Politeknik Negeri Indramayu, 2022–2026, IPK 3.55/4.00), Certifications: (1) Red Hat RH124 (Mei 2024, Certificate of Attendance), (2) VSGA Junior Network Admin (Jun–Jul 2023, 90 jam), Organization: HMTI Ketua Divisi Riset & Teknologi (Jul 2023–Jul 2024) | porto-maskani: education.ts | ✅ Lengkap |
| **Certificates** | Formal qualifications (minimal, hanya 2 item) | Red Hat RH124 (Certificate of Attendance), VSGA Junior Network Admin (90 jam) — dengan images | porto-maskani: education.ts | ✅ Lengkap (hanya 2 cert nyata) |
| **Organization** | Leadership experience | HMTI Ketua Divisi Riset & Teknologi (Jul 2023–Jul 2024) — tampilkan di Experience atau Education, **bukan** di Certificates | porto-maskani: education.ts | ✅ Lengkap |
| **Contact Form** | Lead capture | Nama, email, WhatsApp (opsional), jenis kebutuhan, pesan. Email + WhatsApp fallback. reCAPTCHA opsional (nonaktif bila site key kosong), tanpa budget/timeline field | porto-maskani: profile.ts + custom form | ✅ Custom |
| **GitHub Stats** | (Optional, disembunyikan) | Contribution heatmap **disembunyikan** lewat `Features.ts` (`isGithubEnabled()` default `false`). Frontend memakai public contributions API (tanpa token); endpoint backend memakai GitHub GraphQL dan membutuhkan `GITHUB_TOKEN` yang belum dikonfigurasi/terverifikasi | `Features.ts`, `HomeSections.tsx`, `backend/src/services/github.service.js` | ⏸️ NONAKTIF |
| **WakaTime / Crypto / Social** | (Dihapus) | — | — | ❌ Dihapus |
| **AI Assistant** | Support & engagement | Chat FAB, SSE streaming, Maskani persona (IT Support-oriented). Fail gracefully jika GEMINI_API_KEY kosong | template acuan backend: ai.controller.js, config/identity.js | ✅ Standart (graceful fallback) |
| **Footer** | Closing, links | CV download (Maskani-CV.pdf), social links (LinkedIn, GitHub, WhatsApp, Instagram) — NO copyright, atau Maskani 2026 saja | porto-maskani: profile.ts | ✅ Lengkap |
| **Linktree** | All social profiles & contact | GitHub, LinkedIn, WhatsApp (https://wa.me/6289510134186), Instagram, email, CV download | porto-maskani: profile.ts | ✅ Include (mirror template acuan route) |
| **SEO / Metadata** | Discovery | Title: "Maskani — IT Support & Technical Support Portfolio", description, OG image, canonical (maskani.my.id), JSON-LD (Person, FAQPage, HowTo, ItemList) | Seo.ts template | ✅ Template siap |
| **Favicon, Manifest, Robots** | Branding, crawling | Site icons (dari porto-maskani/public/portrait/), PWA manifest, AI crawler rules | porto-maskani: public/portrait/ (icon, og, favicon) | ✅ Assets ready |

---

## 4. Keputusan Konten (Approval Gerbang 1)

✅ **APPROVED & FINAL:**

1. **Services & Pricing:** ❌ **Dihapus.** Entry-level tidak perlu pricing section.

2. **GitHub Stats:** ⏸️ **NONAKTIF.** Section disembunyikan lewat `Features.ts` sampai `GITHUB_TOKEN`/GraphQL tersedia dan data terverifikasi. Frontend heatmap memakai public API, backend memakai GraphQL.

3. **WakaTime / Crypto / Social:** ❌ **Dihapus semua.** Tidak ada data nyata Maskani, jangan isi karangan.

4. **FAQ:** ✅ **Custom IT Support.** Draft Maskani-specific FAQ (based nyata pada pengalaman Maskani), pending review.

5. **Contact Form:** ✅ **Custom fields.** Nama, email, WhatsApp (opsional), jenis kebutuhan, pesan. Email SMTP + WhatsApp fallback (https://wa.me/6289510134186 format internasional). Honeypot + backend validation; reCAPTCHA v2 hanya aktif bila `VITE_RECAPTCHA_SITE_KEY` diisi. Tanpa budget/timeline.

6. **Bahasa:** ✅ **ID + EN bilingual.** Hapus ZH (Simplified Chinese).

7. **Theme:** ✅ **Dark-first + toggle** (identik template acuan).

8. **Sertifikat:** ✅ **Hanya 2 items nyata:** Red Hat RH124 (Certificate of Attendance), VSGA Junior Network Admin (90 jam). HMTI (Ketua Divisi Riset & Teknologi Jul 2023–Jul 2024) tampilkan sebagai **organizational experience** terpisah, bukan sertifikat.

9. **Portrait / Dot Face:** ⚠️ **WAJIB dibuat ulang dari foto Maskani.** Foto ada di porto-maskani/public/portrait/hero-cutout.webp (dan varian lain). **Tidak boleh pakai portrait.ts template acuan.** Jika tidak feasible di Fase 3, gunakan static image cutout saja (tanpa interaktif dot-matrix).

10. **Assets:**
    - Favicon, icon.webp, og-image → dari porto-maskani/public/portrait/ (cek folder itu)
    - CV → porto-maskani/public/cv/Maskani-CV.pdf
    - Project screenshots → porto-maskani/public/media/ (SIDALEKAS, KMETRIC)
    - LICENSE → Hapus copyright template acuan. Buat atas nama Maskani 2026 atau hapus sama sekali.

11. **Font & Icon (PERSIS template acuan):**
    - **Font:** `font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` — no @font-face, no external load, no Google Fonts dependency.
    - **Icon:** Skill logos = SVG path data (inline, no dependency) rendered as CSS mask (monochrome, inherit text color). Source: Simple Icons (CC0 license) + Font Awesome Brands (AWS only). Data hardcoded di src/data/skills.ts sebagai string path.

12. **Testimonial & Stats:** ❌ **Hapus semua milik template acuan.** Jangan isi data generik/karangan. Jika Maskani punya testimonial nyata, akan ditambah nanti (tidak di Fase 3).

---

## 5. Backend Architecture

**Backend:** Express 4 (CommonJS, Node 24.x). Salin persis dari template acuan, edit config saja.

### Backend Features untuk Kani:

1. **AI Assistant** (Google Gemini)
   - Persona: "Asisten Maskani, IT Support & Technical Support specialist"
   - Input: text + optional multimodal
   - Output: SSE streaming
   - **Graceful fail:** Jika `GEMINI_API_KEY` kosong, endpoint return error message (no crash)
   - **Env var:** `GEMINI_API_KEY` (template only, no real key di repo)

2. **Contact Form** (Email SMTP + WhatsApp redirect)
   - Fields: nama, email, instansi (optional), subjek, pesan, **honeypot field** (hidden, bot trap)
   - Email SMTP: send ke EMAIL_RECIPIENT
   - WhatsApp: render link `https://wa.me/6289510134186` di response (format internasional)
   - **Graceful fail:** Jika EMAIL_* kosong, form still renders tapi submit fail dengan pesan "Email not configured"
   - Backend validation: honeypot check, rate limit, input sanitization
   - **Env var:** EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_RECIPIENT (template only)

3. **GitHub Contributions** — ⏸️ **NONAKTIF / NOT VERIFIED**
   - Section disembunyikan lewat `isGithubEnabled()` di `frontend/src/config/Features.ts` (default `false`).
   - Frontend heatmap: public contributions API (`github-contributions-api.jogruber.de`), tanpa token.
   - Endpoint backend `GET /api/v1/github/contributions` memakai GitHub **GraphQL** dan membutuhkan `GITHUB_TOKEN`. Token belum tersedia, sehingga endpoint ini belum pernah diverifikasi live.
   - Jangan aktifkan section sebelum data dan token diverifikasi.

4. **WakaTime Stats:** ❌ **Dihapus.** Tidak ada data Maskani.

5. **Crypto / Social Stats:** ❌ **Dihapus semua.** Tanpa data nyata.

### Backend Env Template (`.env.example` only):

```env
# Server
NODE_ENV=development
APP_PORT=4000
FRONTEND_HOST=http://localhost:5173

# AI (optional; fail gracefully if empty)
GEMINI_API_KEY=your-gemini-api-key-here

# Email SMTP (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_RECIPIENT=maskani-inbox@example.com

# Logging
LOG_LEVEL=info

# GitHub (opsional; section nonaktif secara default)
GITHUB_USERNAME=Maskani18
GITHUB_TOKEN=your-github-token-here

# Sentry (optional)
SENTRY_DSN=
```

**GitHub GraphQL membutuhkan `GITHUB_TOKEN` (belum tersedia). Tidak ada WhatsApp Cloud API creds, tidak ada WakaTime secret.**

---

## 6. Struktur Folder Kani (Mirror template acuan)

```
kani/
├── frontend/                 # React SPA (Vite)
│   ├── src/
│   │   ├── config/
│   │   │   ├── Identity.ts          # ← Edit: brand, owner, contact, socials
│   │   │   ├── Seo.ts               # ← Edit: routes, FAQ, metadata
│   │   │   ├── Features.ts
│   │   │   └── Api.ts
│   │   ├── data/
│   │   │   ├── site.ts              # ← Edit: services, FAQ, career, stats, testimonials
│   │   │   ├── projects.ts          # ← Edit: 2 projects (SIDALEKAS, KMETRIC)
│   │   │   ├── certificates.ts      # ← Edit: 2 sertif + HMTI org
│   │   │   ├── skills.ts            # ← Edit: 5 skill groups
│   │   │   ├── portrait.ts          # ← WAJIB regenerate dari hero-cutout.webp (atau hapus, pakai static img)
│   │   │   └── social.ts
│   │   ├── components/, lib/, hooks/, pages/ (unchanged)
│   │   └── styles/ (unchanged)
│   ├── public/
│   │   ├── favicon.ico              # ← Ganti
│   │   ├── icon.webp                # ← Ganti (Maskani portrait)
│   │   ├── og-image.png             # ← Ganti
│   │   ├── img/icons/               # ← Ganti PWA icons
│   │   ├── img/projects/            # ← Add: SIDALEKAS, KMETRIC screenshots
│   │   ├── pdf/                     # ← Add: Maskani-CV.pdf
│   │   └── ...
│   ├── index.html, vite.config.ts, tsconfig.json (unchanged)
│   ├── .env.example (update: VITE_DOMAIN, VITE_API_BASE_URL)
│   └── package.json (name: "kani-portfolio")
├── backend/                  # Express API
│   ├── src/
│   │   ├── config/
│   │   │   ├── identity.js          # ← Edit: brand, owner, role, bio, company, social (Maskani)
│   │   │   ├── social.js            # ← **HAPUS** (no TikTok/Instagram stats)
│   │   │   ├── crypto.js            # ← **HAPUS** (no crypto prices)
│   │   │   └── ... (unchanged)
│   │   ├── controllers/
│   │   │   ├── wakatime.controller.js  # ← **HAPUS**
│   │   │   └── ... (keep: ai, contact, github)
│   │   ├── services/
│   │   │   ├── wakatime.service.js     # ← **HAPUS**
│   │   │   ├── crypto.service.js       # ← **HAPUS**
│   │   │   ├── social.service.js       # ← **HAPUS**
│   │   │   └── ... (keep: contact, github)
│   ├── index.js, package.json (name: "kani-backend")
│   ├── .env.example (template di atas)
│   └── vercel.json (unchanged)
├── docs/
│   ├── PRD.md                        # ← This file
│   └── PARITY_REPORT.md              # ← Generated after build
├── README.md                         # ← Install, run, structure
├── .gitignore (unchanged)
└── LICENSE
```

---

## 7. Rencana Implementasi Per Fase

### Fase 3: Scaffold & Instalasi (1–2 jam)
- Buat folder `kani/` di D:\porto\
- Copy folder `frontend/` dan `backend/` dari template acuan (exclude node_modules, .git, dist, build)
- Edit `package.json`: name → `kani-portfolio`, `kani-backend`
- npm install di frontend dan backend
- Create `.env.example` (template di atas)
- **Kriteria selesai:** `npm run dev` jalan di localhost:5173 (frontend) + localhost:4000 (backend), no errors

### Fase 4: Migrasi Konten ke Maskani (2–3 jam)
- **Frontend:**
  - Edit `src/config/Identity.ts`: brand, owner, contact, socials (Maskani), domain (maskani.my.id), WhatsApp (6289510134186 internasional)
  - Edit `src/data/site.ts`: **HAPUS** services, pricing, testimonials, generic stats. Custom FAQ IT Support (draft, review nanti). **HAPUS** referensi crypto/social/wakatime.
  - Edit `src/data/projects.ts`: **GANTI SEMUA** 37 projects template acuan → 2 projects Maskani (SIDALEKAS, KMETRIC)
  - Edit `src/data/certificates.ts`: **GANTI SEMUA** 30 certs template acuan → 2 certs Maskani (Red Hat RH124, VSGA)
  - Edit `src/data/skills.ts`: 5 skill groups Maskani (IT Support, Networking, QA, Frontend, Tools)
  - Edit `src/config/Seo.ts`: routes, title ("Maskani — IT Support Portfolio"), keywords, FAQ, ZH language **HAPUS**
  - **HAPUS** dependency `react-google-recaptcha` di package.json (no reCAPTCHA)
  - Replace `public/favicon.ico`, `public/icon.webp`, `public/og-image.png` dari porto-maskani/public/portrait/
  - Add screenshots: `public/img/projects/{sidalekas,kmetric}/` dari porto-maskani/public/media/
  - Add CV: `public/pdf/Maskani-CV.pdf` dari porto-maskani/public/cv/
  - portrait.ts: **BUAT ULANG** dari hero-cutout.webp atau gunakan static img cutout (catat di PARITY_REPORT)
- **Backend:**
  - Edit `src/config/identity.js`: brand, owner, role, bio (IT Support focus), company, social links (Maskani)
  - **HAPUS** file: `src/config/social.js`, `src/config/crypto.js`
  - **HAPUS** file: `src/controllers/wakatime.controller.js`, `src/services/wakatime.service.js`, `src/services/crypto.service.js`, `src/services/social.service.js`
  - **HAPUS** routes: wakatime, crypto, social dari router
  - Edit `src/controllers/contact.controller.js`: add honeypot validation
  - Edit `src/services/contact.service.js`: WhatsApp link format internasional (6289510134186)
- **Global:**
  - Cari-ganti: "template acuan" → "Kani", "Maskani" → "Maskani", "maskani.my.id" → "maskani.my.id" (grep full repo)
  - **HAPUS** LICENSE template acuan atau buat LICENSE baru atas nama Maskani 2026
- **Kriteria selesai:** No template acuan identity sisa, semua Maskani data terakomodasi, unused files dihapus, build sukses

### Fase 5: Backend (1–2 jam, jika API keys tersedia)
- Run `npm run lint` di backend → green
- Run `npm test` di backend → green
- Test `/health` endpoint
- (Opsional) Test `/api/v1/ai/generate` dengan GEMINI_API_KEY (jika ada)
- **Kriteria selesai:** No linting errors, tests pass, all endpoints functional

### Fase 6: Verifikasi Kesamaan & Kualitas (1–2 jam)
- Side-by-side comparison: template acuan vs kani di browser (localhost:5173)
- Screenshot breakpoints: mobile 375, tablet 768, desktop 1440
- Verifikasi: font, icon, warna, spacing, radius, shadow, animasi identik
- Verifikasi konten: nama, pengalaman, skill, project, sertifikat, kontak cocok dengan Maskani data
- Grep: zero sisa template acuan identity
- Build produksi: `npm run build` → sukses, no warnings
- Lighthouse baseline (Performance, Accessibility, SEO)
- **Kriteria selesai:** Visually identical to template acuan, content 100% Maskani, zero identity leak, production build green

---

## 8. Kriteria Penerimaan (Fase 6 Output)

- [ ] Frontend + backend lokal jalan tanpa error
- [ ] Visually identical to template acuan (font, color, spacing, animation, layout)
- [ ] Semua konten Maskani (nama, pengalaman, pendidikan, skill, project, sertifikat, kontak)
- [ ] No template acuan identity traces (0 grep matches)
- [ ] Build produksi sukses (dist/ terisi, no warnings)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (benchmark: template acuan baseline)
- [ ] Semua link valid (internal + external)
- [ ] Desktop, tablet, mobile screenshots cocok
- [ ] `kani/README.md` + `kani/docs/PARITY_REPORT.md` selesai
- [ ] Ready untuk deploy (no secrets di repo, .env.example template lengkap)

---

## 9. Risiko & Asumsi

### Risiko:
1. **Positioning mismatch:** Kani = IT Support entry-level, tapi design template acuan = mature engineer (37 projects, 30 certs, 10+ tahun). Bisa terlihat overly polished untuk entry-level. **Mitigasi:** Hero subtitle jelas "IT Support | Troubleshooting | Networking", positioning copy consistent.

2. **Sedikit konten (2 projects vs 37):** Grid projects kani jadi sparse. **Mitigasi:** Adjust grid layout (tidak perlu 12-column, bisa 6-column atau card size dinamis). Atau highlight saja 2 project besar + testimonial.

3. **API keys missing:** Jika Maskani tidak punya Gemini key / WhatsApp / GitHub / WakaTime, backend widgets fallback ke static. **Mitigasi:** Clear messaging "Coming soon" atau disable di Features.ts.

4. **CV/Aset belum ada:** Jika Maskani belum siap CV atau portrait photo. **Mitigasi:** Use placeholder / ask untuk timeline delivery.

### Asumsi:
- Maskani punya foto portrait (untuk favicon + og-image + dot-portrait atau diganti).
- Node 24.x + npm 10+ tersedia di mesin.
- D:\porto\ folder sudah ada + bisa write.
- Git lokal only (no remote push ke GitHub).
- Porto-maskani data (profile, experience, skills, projects, education) adalah source of truth terkini.
- Maskani setuju dengan design template acuan (tidak perlu customization warna, font, layout).

---

## 10. Gerbang 1 Approval: APPROVED ✅

Keputusan Maskani confirmed. Lanjut Fase 3.

---

## Ringkasan Eksekusi

**Fase 3–6 estimasi: 5–7 jam kerja nonstop.**

- **Fase 3 (Scaffold):** 1–2 jam
- **Fase 4 (Konten):** 2–3 jam
- **Fase 5 (Backend):** 1–2 jam (jika semua API keys ready)
- **Fase 6 (QA & Deploy):** 1–2 jam

**Output Akhir:**
- `D:\porto\kani/` folder lengkap, siap run
- `kani/README.md` + `kani/docs/PARITY_REPORT.md`
- Lokal dev: `npm run dev` jalan (frontend + backend)
- Siap untuk deploy ke Vercel (atau static host)
- **NO git push, lokal only.**

---

## Gerbang 1 Status: ✅ APPROVED. Fase 3 in progress.
