/* =====================================================================
   SITE DATA — one place to edit content.
   ---------------------------------------------------------------------
   Every screen (home sections, catalogues, career, contact, linktree)
   reads from `S` below. `projects.ts` and `certificates.ts` keep the
   original content; `catalog.ts` normalizes it into the flat,
   language-aware shapes used by the UI.
   ===================================================================== */

import {
  BRAND_NAME,
  OWNER_NAME,
  LEGAL_NAME,
  OWNER_ALIAS,
  JOB_TITLE,
  HEADLINE,
  CONTACT_EMAIL,
  BUSINESS_EMAIL,
  WHATSAPP_NUMBER,
  SOCIAL_LINKS,
  GITHUB_USERNAME,
  WAKATIME_USERNAME,
  TIMEZONE,
  TIMEZONE_LABEL,
  RESUME,
  COMPANY,
  PORTRAIT_IMAGE,
} from '../config/Identity.ts';
import { rawProjects } from './projects.ts';
import { rawCertificates } from './certificates.ts';
import { CERT_GROUPS } from './certGroups.ts';
import { galleryLabel } from './galleryLabels.ts';
import type { IconName } from '../lib/utils.ts';

export type Language = 'en' | 'id';
export type LocalizedText = { en: string; id: string };

export const HOME_REVIEW_COUNT = 6;

export type ProjectCategory =
  | 'Network System'
  | 'Web App'
  | 'Business System'
  | 'E-Commerce'
  | 'Landing Page'
  | 'Template'
  | 'Creative'
  | 'AI & Automation'
  | 'Quality Assurance';

export interface RawProject {
  title: LocalizedText;
  category: ProjectCategory;
  description: LocalizedText;
  urlDirect?: string;
  srcImage: string;
  images?: string[];
  tags?: { en: string[]; id: string[] };
  icons: string[];
  best?: boolean;
}

export interface GalleryItem {
  src: string;
  caption: LocalizedText;
}

export interface Project {
  id: string;
  title: LocalizedText;
  year: string;
  role: LocalizedText;
  desc: LocalizedText;
  about?: LocalizedText;
  tags: LocalizedText[];
  skills: string[];
  url?: string;
  thumb: string;
  gallery: GalleryItem[];
  category: ProjectCategory;
  featured: boolean;
}

export interface Cert {
  id: string;
  name: string;
  issuer: LocalizedText;
  date: string;
  url?: string;
  img: string;
  secondary?: { src: string; label: LocalizedText };
  tags: LocalizedText[];
  desc: LocalizedText;
  skills: string[];
  academic: boolean;
  featured: boolean;
  verified: boolean;
  count: number;
  details?: { label: string; date: string }[];
  pages?: { src: string; label: LocalizedText }[];
  facts?: { label: LocalizedText; value: string }[];
  kind: LocalizedText;
}

export interface CareerItem {
  period: LocalizedText;
  role: LocalizedText;
  org: string;
  location: LocalizedText;
  desc: LocalizedText;
  website?: string;
  /** Optional: only set when a genuine, verifiable logo asset exists. */
  logo?: string;
  points: LocalizedText[];
  start: string;
  end: string | null;
}

export interface LinkItem {
  label: LocalizedText;
  note: LocalizedText;
  url: string;
  icon: IconName;
  featured?: boolean;
}

export interface SocialLink {
  icon: IconName;
  label: LocalizedText;
  url: string;
  external: boolean;
}

export interface Step {
  title: LocalizedText;
  desc: LocalizedText;
}

export interface Faq {
  q: LocalizedText;
  a: LocalizedText;
}

export interface LinktreeHub {
  label: LocalizedText;
  domain: string;
  href: string;
  image: string;
}

export type CatalogItem = Project | Cert;

const SLUG_MAX = 60;

const slug = (s: string): string => {
  const full = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (full.length <= SLUG_MAX) return full;
  const cut = full.slice(0, SLUG_MAX);
  const boundary = cut.lastIndexOf('-');
  return (boundary > 0 ? cut.slice(0, boundary) : cut).replace(/-+$/, '');
};

const toAbsoluteAssetPath = (src: string): string =>
  src.startsWith('/') || /^[a-z]+:\/\//i.test(src) ? src : `/${src}`;

const splitTitle = (title: string): { name: string; subtitle?: string } => {
  const m = title.match(/^(.+?)\s+-\s+(.+)$/);
  if (!m) return { name: title };
  return { name: m[1].trim(), subtitle: m[2].trim() };
};

const prettyFileName = (src: string): string =>
  (src.split('/').pop() ?? src)
    .replace(/\.\w+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const roleFor = (p: RawProject): LocalizedText => {
  const primary = p.icons[0] ?? 'Web';
  const extra = p.icons.slice(1, 3);
  const stack = [primary, ...extra].join(' · ');
  const kind =
    p.category === 'Quality Assurance'
      ? { en: 'Quality Assurance', id: 'Quality Assurance' }
      : p.category === 'Creative'
      ? { en: 'Creative build', id: 'Karya kreatif' }
      : p.category === 'Template'
        ? { en: 'Template', id: 'Template' }
        : p.category === 'Landing Page'
          ? { en: 'Landing page', id: 'Landing page' }
          : p.category === 'E-Commerce'
            ? { en: 'E-commerce', id: 'E-commerce' }
            : p.category === 'Business System'
              ? { en: 'Business system', id: 'Sistem bisnis' }
              : p.category === 'AI & Automation'
                ? { en: 'AI & automation', id: 'AI & otomatisasi' }
                : { en: 'Web app', id: 'Aplikasi web' };
  return { en: `${kind.en} · ${stack}`, id: `${kind.id} · ${stack}` };
};

const BEST_ORDER = [
  'sidalekas-social-welfare-institute-data-system',
  'k-metric-mikrotik-bandwidth-traffic-monitoring-with-k-means',
  'quality-assurance-matrik-tindak-lanjut',
  'trenseter-ppts-snbt-preparation-tryout-system',
];

const projects: Project[] = rawProjects.map((p) => {
  const thumb = toAbsoluteAssetPath(p.srcImage);
  const images = (p.images ?? []).map(toAbsoluteAssetPath);
  const gallery: GalleryItem[] = (images.length ? images : [thumb]).map((src) => ({
    src,
    caption: { en: galleryLabel(src, 'en'), id: galleryLabel(src, 'id') },
  }));
  return {
    id: slug(p.title.en),
    title: { en: p.title.en, id: p.title.id },
    year: '2025',
    role: roleFor(p),
    desc: { en: p.description.en, id: p.description.id },
    tags: (p.tags?.en ?? []).map((t, k) => ({
      en: t,
      id: p.tags?.id?.[k] ?? t,
    })),
    skills: p.icons,
    url: p.urlDirect,
    thumb,
    gallery,
    category: p.category,
    featured: p.best === true,
  };
});

const featured = projects
  .filter((p) => p.featured)
  .toSorted((a, b) => {
    const ai = BEST_ORDER.indexOf(a.id);
    const bi = BEST_ORDER.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

const issuerFor = (title: string, tags: string[], subtitle?: string): string => {
  void title;
  return (
    tags.find((t) => /[A-Z]{2,}/.test(t) && !/Development|Score|Quiz|Basic/i.test(t)) ??
    subtitle ??
    BRAND_NAME
  );
};

const VERIFIABLE_ISSUERS = new Set([
  'Red Hat',
  'KOMINFO',
]);

const baseCerts: Cert[] = rawCertificates.map((c) => {
  const { name, subtitle } = splitTitle(c.title);
  const tags = c.tags ?? [];
  const id = slug(c.title);
  const issuerName = issuerFor(c.title, tags, subtitle);
  return {
    id,
    name,
    issuer: { en: issuerName, id: issuerName },
    date: c.published,
    url: c.urlDirect,
    img: toAbsoluteAssetPath(c.srcImage),
    secondary: c.srcImageSecondary
      ? {
          src: toAbsoluteAssetPath(c.srcImageSecondary),
          label: { en: c.secondaryLabel ?? 'Result sheet', id: c.secondaryLabel ?? 'Lembar hasil' },
        }
      : undefined,
    tags: tags.map((t) => ({ en: t, id: t })),
    desc: {
      en: `${name}${subtitle ? ' — ' + subtitle : ''}. Issued ${c.published}. ${tags.length ? 'Covers: ' + tags.join(', ') + '.' : ''}`,
      id: `${name}${subtitle ? ' — ' + subtitle : ''}. Diterbitkan ${c.published}. ${tags.length ? 'Mencakup: ' + tags.join(', ') + '.' : ''}`,
    },
    skills: tags.length ? tags : [prettyFileName(c.srcImage)],
    academic: c.thisAcademic,
    featured: c.best === true,
    verified: Boolean(c.urlDirect) || VERIFIABLE_ISSUERS.has(issuerName),
    count: 1,
    kind: { en: 'Certificate', id: 'Sertifikat' },
    pages: c.pages?.map((p) => ({
      src: toAbsoluteAssetPath(p.src),
      label: { en: p.label, id: p.label },
    })),
    facts: c.facts?.map((f) => ({
      label: { en: f.label, id: f.label },
      value: f.value,
    })),
  };
});

const certs: Cert[] = baseCerts;

const featuredCerts: Cert[] = certs.filter((c) => c.featured);

const career: CareerItem[] = [
  {
    period: { en: 'Oct 2025 – Dec 2025', id: 'Okt 2025 – Des 2025' },
    start: '2025-10',
    end: '2025-12',
    role: { en: 'IT Intern (Staff IT)', id: 'Staff IT Intern' },
    org: 'Diskominfo Kabupaten Indramayu',
    location: { en: 'Indramayu, Indonesia', id: 'Indramayu, Indonesia' },
    logo: '/img/career/Diskominfo_Indramayu.png',
    desc: {
      en: 'Handled LAN/Wi-Fi/DNS/DHCP connectivity, network devices and CCTV, preventive maintenance, endpoint support (PC/laptop/printer/peripherals), Windows/Office 365 troubleshooting, antivirus/endpoint security checks, and developed SIDALEKAS UI (React.js, Tailwind CSS, REST API/Axios).',
      id: 'Mengelola konektivitas LAN, Wi-Fi, DNS, dan DHCP, membantu pengelolaan perangkat jaringan (router, switch) dan CCTV, preventive maintenance, dukungan endpoint (PC/laptop/printer/periferal), troubleshooting Windows/Office 365, pemeriksaan antivirus/endpoint security, serta mengembangkan antarmuka SIDALEKAS (React.js, Tailwind CSS, REST API/Axios).',
    },
    points: [
      { en: 'Managed LAN, Wi-Fi, DNS, and DHCP connectivity; assisted with router/switch and CCTV management.', id: 'Mengelola konektivitas LAN, Wi-Fi, DNS, dan DHCP, serta membantu pengelolaan perangkat jaringan (router dan switch) dan CCTV.' },
      { en: 'Performed preventive maintenance on hardware and IT inventory; installed, configured, maintained, and troubleshot PCs, laptops, monitors, keyboards, mice, printers, and scanners.', id: 'Menjalankan preventive maintenance rutin pada perangkat keras dan inventaris IT; menangani instalasi, konfigurasi, pemeliharaan, dan troubleshooting PC, laptop, monitor, keyboard, mouse, printer, dan scanner.' },
      { en: 'Resolved issues in Windows, Microsoft Office 365, office apps, and web browsers; checked devices for viruses/malware and maintained antivirus/endpoint security.', id: 'Menyelesaikan kendala pada Windows, Microsoft Office 365, aplikasi perkantoran, dan web browser; memeriksa perangkat dari virus dan malware, serta memelihara antivirus dan endpoint security.' },
      { en: 'Developed SIDALEKAS interface with React.js and Tailwind CSS (CRUD, search, filter, form validation) and integrated REST API via Axios.', id: 'Mengembangkan antarmuka aplikasi SIDALEKAS dengan React.js dan Tailwind CSS (CRUD, pencarian, filter, validasi form) dan integrasi REST API lewat Axios.' },
    ],
  },
  {
    period: { en: 'Jul 2025 – Oct 2025', id: 'Jul 2025 – Okt 2025' },
    start: '2025-07',
    end: '2025-10',
    role: { en: 'Software Quality Assurance (QA) Intern', id: 'Software Quality Assurance (QA) Intern' },
    org: 'PT Qtasnim Digital Teknologi',
    location: { en: 'Bandung, Indonesia (Remote/Hybrid, per assignment)', id: 'Bandung, Indonesia (Remote/Hybrid, sesuai penugasan)' },
    logo: '/img/career/pt qtasnim.webp',
    desc: {
      en: 'QA Intern on Matrix Tindak Lanjut (MTL) web app: authored 100+ UAT test cases, designed positive/negative scenarios, ran functional testing and UAT, logged bugs, retested fixes, and coordinated with developers using ClickUp.',
      id: 'QA Intern pada aplikasi web Matrix Tindak Lanjut (MTL): menyusun 100+ test case UAT, merancang skenario positif/negatif, menjalankan functional testing dan UAT, mencatat bug, retesting perbaikan, dan berkoordinasi dengan developer menggunakan ClickUp.',
    },
    points: [
      { en: 'Authored 100+ UAT test cases (scripts, procedures, expected results) for MTL covering Master Data, Directive Monitoring, Tindak Lanjut, and User Management.', id: 'Menyusun 100+ test case UAT (script test, prosedur pengujian, dan expected result) untuk aplikasi web MTL, mencakup modul Master Data, Directive Monitoring, Tindak Lanjut, dan User Management.' },
      { en: 'Designed positive/negative scenarios: required-field validation, special chars, invalid type/date input, upload size limits; tested CRUD, search, filter, sorting, pagination, column visibility, multi-role workflows, and role-based access.', id: 'Merancang skenario positif/negatif: validasi field wajib, karakter khusus, input huruf pada field angka/tanggal, batas ukuran unggah file; menguji CRUD, pencarian, filter, sorting, pagination, column visibility, alur kerja multi-peran, dan pembatasan akses data sesuai peran.' },
      { en: 'Executed manual functional testing and UAT, documented bug findings (OK/NOT OK, explanation, notes), performed retesting, and coordinated with developers.', id: 'Menjalankan functional testing manual dan UAT, mencatat temuan bug, mendokumentasikan hasil pengujian (OK/NOT OK, penjelasan, catatan), melakukan retesting, dan berkoordinasi dengan developer.' },
      { en: 'Managed daily work using ClickUp.', id: 'Mengelola pekerjaan harian menggunakan ClickUp.' },
    ],
  },
  {
    period: { en: 'Oct 2019 – Jan 2020', id: 'Okt 2019 – Jan 2020' },
    start: '2019-10',
    end: '2020-01',
    role: { en: 'IT Support (Praktik Kerja Lapangan)', id: 'IT Support (Praktik Kerja Lapangan)' },
    org: 'PT Dirgantara Indonesia (Persero)',
    location: { en: 'Bandung, Indonesia', id: 'Bandung, Indonesia' },
    logo: '/img/career/pt dirgantara.webp',
    desc: {
      en: 'Provided on-site and remote (TeamViewer) desktop support: install/config/maintain/troubleshoot PCs, laptops, monitors, peripherals, printers/scanners, Windows/software issues, sparepart replacement, TCP/IP/LAN/Wi-Fi/router/switch/cabling, and employee internet auth/access control via MikroTik and proxy.',
      id: 'Memberikan dukungan teknis on-site dan remote (TeamViewer): instalasi/konfigurasi/pemeliharaan/troubleshooting PC, laptop, monitor, periferal, printer/scanner, kendala Windows/software, penggantian sparepart, TCP/IP/LAN/Wi-Fi/router/switch/crimping kabel, serta autentikasi login internet karyawan dan pembatasan akses lewat MikroTik dan proxy.',
    },
    points: [
      { en: 'Delivered on-site desktop support and remote support via TeamViewer for PC/laptop/peripheral/printer/scanner setup, maintenance, and troubleshooting, including Windows installation/configuration.', id: 'Memberikan dukungan teknis langsung (desktop support) dan jarak jauh (TeamViewer) untuk instalasi, konfigurasi, pemeliharaan, dan troubleshooting PC, laptop, monitor, keyboard, mouse, printer, scanner, serta kendala software termasuk instalasi/konfigurasi Windows.' },
      { en: 'Handled sparepart replacement (RAM, SSD, battery, monitor power supply).', id: 'Mengelola penggantian komponen (sparepart replacement seperti RAM, SSD, baterai, dan power supply monitor).' },
      { en: 'Managed TCP/IP, LAN, Wi-Fi, router, and switch connectivity; performed cable crimping and resolved office network issues.', id: 'Mengelola konektivitas TCP/IP, LAN, Wi-Fi, router, dan switch, melakukan crimping kabel, serta menangani kendala konektivitas jaringan kantor.' },
      { en: 'Managed employee internet login authentication and access restrictions using MikroTik and proxy.', id: 'Mengelola autentikasi login internet karyawan dan pembatasan akses internet menggunakan MikroTik dan proxy.' },
    ],
  },
  {
    period: { en: 'Jul 2023 – Jul 2024', id: 'Jul 2023 – Jul 2024' },
    start: '2023-07',
    end: '2024-07',
    role: { en: 'Head of Research and Technology Division (Organization)', id: 'Ketua Divisi Riset dan Teknologi (Ristek)' },
    org: 'Himpunan Mahasiswa Teknik Informatika ()',
    location: { en: 'Politeknik Negeri Indramayu', id: 'Politeknik Negeri Indramayu' },
    logo: '/img/career/hmti.webp',
    desc: {
      en: 'Led Ristek division (13 members), coordinating two subdivisions (Competitions and Study Club) in planning, execution, and evaluation of work programs.',
      id: 'Memimpin Divisi Riset dan Teknologi (Ristek) beranggotakan 13 orang dan mengoordinasikan dua subdivisi (Kompetisi dan Study Club) dalam perencanaan, pelaksanaan, dan evaluasi program kerja.',
    },
    points: [
      { en: 'Led Ristek division with 13 members across Competitions and Study Club subdivisions.', id: 'Memimpin Divisi Ristek beranggotakan 13 orang dan mengoordinasikan subdivisi Kompetisi dan Study Club.' },
      { en: 'Managed programs: Seminar Teknologi, IT Ramadhan, Bootcamp KMIPN, PKM, Gemastik, IT Kompetisi, and academic classes (Math, Programming, Cyber Security).', id: 'Mengelola program Seminar Teknologi dan IT Ramadhan, Bootcamp KMIPN, PKM, Gemastik, dan IT Kompetisi, serta kelas akademik Matematika dan kelas reguler Pemrograman dan Cyber Security.' },
    ],
  },
];

export interface Service {
  slug: string;
  title: LocalizedText;
  desc: LocalizedText;
  meta: LocalizedText;
  fitsFor: LocalizedText;
  amountIDR: number;
  from: LocalizedText;
  periodSuffix?: string;
}

export interface Testimonial {
  name: string;
  role: LocalizedText;
  quote: LocalizedText;
  img: string;
}

export interface SiteConfig {
  name: string;
  alias: string;
  owner: string;
  legalName: string;
  role: string;
  headline: string;
  email: string;
  businessEmail: string;
  wa: string;
  github: string;
  tz: string;
  tzLabel: string;
  portrait: string;
  resume: typeof RESUME;
  company: typeof COMPANY;
  social: typeof SOCIAL_LINKS;
  stack: string[];
  wakatime: string;
  services: Service[];
  testimonials: Testimonial[];
  process: Step[];
  faq: Faq[];
  headlineRotator: Record<Language, string[]>;
  projects: Project[];
  featuredProjects: Project[];
  certs: Cert[];
  certGroups: CertGroup[];
  certsFeatured: Cert[];
  featuredCerts: Cert[];
  career: CareerItem[];
  links: LinkItem[];
  socialLinks: SocialLink[];
  hubs: LinktreeHub[];
  contactTypes: LocalizedText[];
  budgets: LocalizedText[];
  timelines: LocalizedText[];
  budgetNote: LocalizedText;
}

export interface CertGroup {
  id: string;
  label: LocalizedText;
  desc: LocalizedText;
  ids: string[];
}

export const S: SiteConfig = {
  name: BRAND_NAME,
  alias: OWNER_ALIAS,
  owner: OWNER_NAME,
  legalName: LEGAL_NAME,
  role: JOB_TITLE,
  headline: HEADLINE,
  email: CONTACT_EMAIL,
  businessEmail: BUSINESS_EMAIL,
  wa: WHATSAPP_NUMBER,
  github: GITHUB_USERNAME,
  wakatime: WAKATIME_USERNAME,
  tz: TIMEZONE,
  tzLabel: TIMEZONE_LABEL,
  portrait: PORTRAIT_IMAGE,
  resume: RESUME,
  company: COMPANY,
  social: SOCIAL_LINKS,

  stack: [
    'Windows',
    'Linux',
    'MikroTik RouterOS',
    'React.js',
    'Tailwind CSS',
    'Laravel',
    'PostgreSQL',
    'MySQL',
    'Axios',
    'Postman',
    'ClickUp',
    'Manual testing',
    'Black Box Testing',
    'UAT',
    'Retesting',
    'Bug reporting',
    'Test case',
    'TCP/IP',
    'Subnetting',
    'VLAN',
    'Routing and switching',
    'Proxy',
    'LAN cabling (crimping)',
    'Wireless network (Ruijie)',
    'Connectivity troubleshooting',
    'Bandwidth traffic monitoring (RX/TX via RouterOS API)',
    'Traffic anomaly detection',
    'Incident logging and handling (audit trail)',
    'Technical support',
    'Hardware and software troubleshooting',
    'Windows installation and configuration',
    'Printer setup',
    'Device maintenance',
    'CCTV',
    'Basic Linux',
    'Technical Documentation',
  ],

  services: [],
  testimonials: [],

  process: [
    {
      title: { en: 'Diagnose', id: 'Diagnosis' },
      desc: { en: 'Identify the issue and confirm the symptoms.', id: 'Identifikasi masalah dan konfirmasi gejalanya.' },
    },
    {
      title: { en: 'Plan', id: 'Rencana' },
      desc: { en: 'Agree on the fix, scope, and timing.', id: 'Sepakati perbaikan, ruang lingkup, dan waktu.' },
    },
    {
      title: { en: 'Fix', id: 'Perbaikan' },
      desc: { en: 'Apply the fix or hand over the tested result.', id: 'Terapkan perbaikan atau serahkan hasil yang sudah diuji.' },
    },
    {
      title: { en: 'Verify', id: 'Verifikasi' },
      desc: { en: 'Retest and document what changed.', id: 'Uji ulang dan dokumentasikan perubahan.' },
    },
  ],

  faq: [
    {
      q: { en: 'What roles are you looking for?', id: 'Posisi apa yang Anda cari?' },
      a: {
        en: 'I focus on two tracks: Software Quality Assurance (manual tester) and Junior IT Support & Network Support (helpdesk, troubleshooting, MikroTik). Open to roles in either track. (TODO-DATA: availability/preferred location if needed)',
        id: 'Saya fokus di dua jalur: Software Quality Assurance (manual tester) dan Junior IT Support & Network Support (helpdesk, troubleshooting, MikroTik). Terbuka untuk peran di salah satu jalur. (TODO-DATA: ketersediaan/lokasi preferensi jika diperlukan)',
      },
    },
    {
      q: { en: 'What QA experience do you have?', id: 'Apa pengalaman QA Anda?' },
      a: {
        en: 'QA Intern at PT Qtasnim Digital Teknologi (Jul–Oct 2025): authored 100+ UAT test cases for Matrix Tindak Lanjut (MTL), designed positive/negative scenarios, executed manual functional testing and UAT, logged bugs (OK/NOT OK with notes), performed retesting, and coordinated with developers via ClickUp. Also applied Black Box Testing and Postman API testing in academic projects.',
        id: 'QA Intern di PT Qtasnim Digital Teknologi (Jul–Okt 2025): menyusun 100+ test case UAT untuk Matrix Tindak Lanjut (MTL), merancang skenario positif/negatif, menjalankan functional testing manual dan UAT, mencatat bug (OK/NOT OK beserta catatan), melakukan retesting, dan berkoordinasi dengan developer lewat ClickUp. Juga menerapkan Black Box Testing dan pengujian API Postman pada proyek akademik.',
      },
    },
    {
      q: { en: 'What IT support and networking experience do you have?', id: 'Apa pengalaman IT support dan jaringan Anda?' },
      a: {
        en: 'IT Intern at Diskominfo Indramayu (Oct–Dec 2025): LAN/Wi-Fi/DNS/DHCP, router/switch/CCTV, preventive maintenance, endpoint troubleshooting (Windows, Office 365, printer/peripherals), antivirus/endpoint security. IT Support PKL at PT Dirgantara Indonesia (Oct 2019–Jan 2020): on-site and remote (TeamViewer) desktop support, sparepart replacement, TCP/IP/LAN/Wi-Fi/cabling, MikroTik/proxy internet auth and access control.',
        id: 'Staff IT Intern di Diskominfo Indramayu (Okt–Des 2025): LAN/Wi-Fi/DNS/DHCP, router/switch/CCTV, preventive maintenance, troubleshooting endpoint (Windows, Office 365, printer/periferal), antivirus/endpoint security. IT Support PKL di PT Dirgantara Indonesia (Okt 2019–Jan 2020): desktop support on-site dan remote (TeamViewer), penggantian sparepart, TCP/IP/LAN/Wi-Fi/crimping, autentikasi/pembatasan akses internet lewat MikroTik dan proxy.',
      },
    },
    {
      q: { en: 'What training or certification is relevant?', id: 'Pelatihan atau sertifikasi apa yang relevan?' },
      a: {
        en: 'Relevant training includes Red Hat System Administration I (RH124) and Junior Network Administrator (VSGA KOMINFO, 90 hours). Supporting certificates cover networking, IT support, web development, and data. Full list is on the Certificates page.',
        id: 'Pelatihan relevan mencakup Red Hat System Administration I (RH124) dan Junior Network Administrator (VSGA KOMINFO, 90 jam). Sertifikat pendukung mencakup jaringan, IT support, web development, dan data. Daftar lengkap ada di halaman Sertifikat.',
      },
    },
    {
      q: { en: 'What tools and skills do you use?', id: 'Tools dan keahlian apa yang Anda gunakan?' },
      a: {
        en: 'QA: manual/functional testing, Black Box, UAT, test scenario/case, bug reporting, retesting, SDLC. Tools: Postman, SQL (PostgreSQL/MySQL), ClickUp, Excel, Word. IT Support: hardware/software troubleshooting, desktop/remote support (TeamViewer), Windows, Office 365, printer/peripherals, preventive maintenance, antivirus/endpoint security. Network: TCP/IP, DNS/DHCP, LAN/Wi-Fi, router/switch, MikroTik, VPN, cable crimping, CCTV. Web: React.js, Tailwind CSS, Laravel, REST API (Axios).',
        id: 'QA: manual/functional testing, Black Box, UAT, test scenario/case, bug reporting, retesting, SDLC. Tools: Postman, SQL (PostgreSQL/MySQL), ClickUp, Excel, Word. IT Support: troubleshooting hardware/software, desktop/remote support (TeamViewer), Windows, Office 365, printer/periferal, preventive maintenance, antivirus/endpoint security. Jaringan: TCP/IP, DNS/DHCP, LAN/Wi-Fi, router/switch, MikroTik, VPN, crimping kabel, CCTV. Web: React.js, Tailwind CSS, Laravel, REST API (Axios).',
      },
    },
    {
      q: { en: 'How can I contact you or download your CV?', id: 'Bagaimana cara menghubungi dan mengunduh CV Anda?' },
      a: {
        en: 'Email: Maskani180104@gmail.com. WhatsApp: +62 895-1013-4186. LinkedIn: linkedin.com/in/mas-kani18. Portfolio: maskani.my.id. Two CVs are available: CV Software QA and CV IT Support & Network (download links on the site).',
        id: 'Email: Maskani180104@gmail.com. WhatsApp: +62 895-1013-4186. LinkedIn: linkedin.com/in/mas-kani18. Portofolio: maskani.my.id. Tersedia dua CV: CV Software QA dan CV IT Support & Network (tautan unduh di situs).',
      },
    },
  ],

  headlineRotator: {
    en: ['QA Manual Testing', 'Junior IT Support', 'Network Support (MikroTik)'],
    id: ['QA Manual Testing', 'Junior IT Support', 'Network Support (MikroTik)'],
  },

  projects,
  featuredProjects: featured,
  certs,
  certGroups: CERT_GROUPS,
  certsFeatured: featuredCerts,
  featuredCerts: featuredCerts.filter((c) => c.featured).slice(0, 4),
  career,
  links: [
    { label: { en: 'Portfolio', id: 'Portofolio' }, note: { en: 'Selected work & case studies', id: 'Karya pilihan & studi kasus' }, url: '/', icon: 'web', featured: true },
    { label: { en: 'Contact', id: 'Kontak' }, note: { en: 'Inquiries', id: 'Pertanyaan' }, url: '/contact', icon: 'mail' },
  ],
  socialLinks: [
    { icon: 'whatsapp', label: { en: 'WhatsApp', id: 'WhatsApp' }, url: `https://wa.me/${WHATSAPP_NUMBER}`, external: true },
    { icon: 'github', label: { en: 'GitHub', id: 'GitHub' }, url: SOCIAL_LINKS.github, external: true },
    { icon: 'instagram', label: { en: 'Instagram', id: 'Instagram' }, url: SOCIAL_LINKS.instagram, external: true },
    { icon: 'linkedin', label: { en: 'LinkedIn', id: 'LinkedIn' }, url: SOCIAL_LINKS.linkedin, external: true },
  ],
  hubs: [
    { label: { en: 'Portfolio', id: 'Portofolio' }, domain: 'maskani.id', href: '/', image: '/favicon.ico' },
  ],
  contactTypes: [
    { en: 'IT Support', id: 'IT Support' },
    { en: 'Technical Assistance', id: 'Bantuan Teknis' },
  ],
  budgets: [
    { en: 'Under 1M', id: 'Di bawah 1 juta' },
    { en: '1M – 3M', id: '1 juta – 3 juta' },
    { en: '3M – 5M', id: '3 juta – 5 juta' },
    { en: 'Above 5M', id: 'Di atas 5 juta' },
    { en: 'Flexible', id: 'Fleksibel' },
  ],
  timelines: [
    { en: 'ASAP', id: 'Secepatnya' },
    { en: '1 – 2 weeks', id: '1 – 2 minggu' },
    { en: '2 – 4 weeks', id: '2 – 4 minggu' },
    { en: 'Flexible', id: 'Fleksibel' },
  ],
  budgetNote: {
    en: 'Pricing depends on scope. Share your budget and I will let you know if it fits.',
    id: 'Harga tergantung lingkup pekerjaan. Sebutkan budget Anda dan saya akan bilang apakah sesuai.',
  },
};

export const waLink = (lang: Language): string => {
  const head = lang === 'id' ? `Halo ${S.name}, saya mau diskusi` : `Hi ${S.name}, I'd like to discuss`;
  return `https://wa.me/${S.wa}?text=${encodeURIComponent(head)}`;
};
