import type { RawProject } from './site';

/** Raw (bilingual) project entries — normalized by catalog.ts into `S.projects`. */
export const rawProjects: RawProject[] = [
  {
    title: {
      en: "SIDALEKAS — Social Welfare Institute Data System",
      id: "SIDALEKAS — Sistem Informasi Data Lembaga Kesejahteraan Sosial",
    },
    category: "Web App",
    best: true,
    description: {
      en: "A web application developed for Diskominfo Indramayu to streamline social welfare institute data management and verification. Developed the interface with React.js and Tailwind CSS (CRUD, search, filter, form validation) and integrated REST API with Axios.",
      id: "Aplikasi berbasis web yang dikembangkan untuk Diskominfo Kabupaten Indramayu guna mendukung pengelolaan dan verifikasi data Lembaga Kesejahteraan Sosial. Mengembangkan antarmuka dengan React.js dan Tailwind CSS (CRUD, pencarian, filter, validasi form) dan integrasi REST API dengan Axios.",
    },
    srcImage: "/img/projects/sidalekas/login.webp",
    images: [
      "/img/projects/sidalekas/login.webp",
      "/img/projects/sidalekas/data-klien.webp",
      "/img/projects/sidalekas/form-verifikasi.webp",
    ],
    tags: {
      en: ["React.js", "Tailwind CSS", "Axios", "REST API", "CRUD"],
      id: ["React.js", "Tailwind CSS", "Axios", "REST API", "CRUD"],
    },
    icons: ["React", "Tailwind CSS", "Axios"],
  },
  {
    title: {
      en: "K-METRIC — MikroTik Bandwidth Traffic Monitoring with K-Means Clustering",
      id: "K-METRIC — Monitoring Trafik Bandwidth Jaringan Router MikroTik Menggunakan Metode K-Means Clustering",
    },
    category: "Web App",
    best: true,
    description: {
      en: "Thesis project (Politeknik Negeri Indramayu, Feb 2026 – Jul 2026): web-based monitoring system (Laravel 11, React.js, PostgreSQL) integrated with MikroTik RB931-2nD (hAP mini) via RouterOS API. Collects RX/TX traffic automatically every 3 minutes on a test network with Ruijie RG-EW300N (WISP mode). K-Means Clustering (K=3) classifies 1,500 traffic records into Normal, Suspicious, Anomaly with 98.33% agreement to reference labels. Includes real-time dashboard, anomaly notifications (pop-up and sound), and incident logs as audit trail. Black Box Testing: all modules valid.",
      id: "Skripsi (Politeknik Negeri Indramayu, Feb 2026 – Jul 2026): sistem monitoring web (Laravel 11, React.js, PostgreSQL) terintegrasi dengan router MikroTik RB931-2nD (hAP mini) lewat RouterOS API, mengambil data trafik RX/TX otomatis tiap 3 menit pada jaringan uji dengan router Ruijie RG-EW300N (mode WISP). K-Means Clustering (K=3) pada 1.500 rekaman trafik ke kategori Normal, Mencurigakan, Anomali dengan kesesuaian 98,33% terhadap label referensi. Dashboard real-time, notifikasi anomali (pop-up dan suara), log insiden sebagai audit trail. Black Box Testing: seluruh modul berstatus Valid.",
    },
    srcImage: "/img/projects/kmetric/konfigurasi-router.webp",
    images: [
      "/img/projects/kmetric/konfigurasi-router.webp",
      "/img/projects/kmetric/dashboard-grafik.webp",
      "/img/projects/kmetric/log-insiden.webp",
    ],
    tags: {
      en: ["Laravel 11", "React.js", "PostgreSQL", "MikroTik RouterOS API", "K-Means"],
      id: ["Laravel 11", "React.js", "PostgreSQL", "MikroTik RouterOS API", "K-Means"],
    },
    icons: ["Laravel", "React", "PostgreSQL", "MikroTik RouterOS"],
  },
  {
    title: {
      en: "Trenseter PPTS — SNBT Preparation & Tryout System",
      id: "Trenseter PPTS — Sistem Persiapan dan Tryout SNBT",
    },
    category: "Web App",
    best: true,
    description: {
      en: "Academic web app for SNBT preparation and tryout. Authored Software Requirement Specification (SKPL) with a 3-person team covering 10 functional and 9 non-functional requirements, plus use case, class, and sequence diagrams. Designed and executed 20 manual test cases (positive/negative) for Admin and Client modules with clear steps, expected/actual results, priority, and status. Validated core flows: latihan soal, tryout, riwayat ujian, profil, and account security (password change, 2FA, browser session). Performed API testing with Postman.",
      id: "Aplikasi web akademik untuk persiapan dan tryout SNBT. Menyusun Spesifikasi Kebutuhan Perangkat Lunak (SKPL) bersama tim 3 orang: 10 kebutuhan fungsional, 9 kebutuhan non-fungsional, serta use case, class diagram, dan sequence diagram. Merancang dan mengeksekusi 20 test case manual (positif/negatif) pada modul Admin dan Client dengan langkah uji, expected/actual result, prioritas, dan status. Memvalidasi alur utama: latihan soal, tryout, riwayat ujian, profil, dan keamanan akun (ubah password, 2FA, sesi browser). Melakukan pengujian API menggunakan Postman.",
    },
    srcImage: "/img/projects/trenseter/test-case-1.webp",
    images: [
      "/img/projects/trenseter/test-case-1.webp",
      "/img/projects/trenseter/test-case-2.webp",
    ],
    tags: {
      en: ["Manual Testing", "Test Case", "UAT", "Postman", "Documentation"],
      id: ["Manual Testing", "Test Case", "UAT", "Postman", "Dokumentasi"],
    },
    icons: ["Postman"],
  },
  {
    title: {
      en: "Quality Assurance — Matrik Tindak Lanjut",
      id: "Quality Assurance — Matrik Tindak Lanjut",
    },
    category: "Quality Assurance",
    best: true,
    description: {
      en: "QA internship at PT Qtasnim Digital Teknologi. Authored 100+ UAT test cases (test scripts, procedures, expected results) for Matrix Tindak Lanjut web app covering Master Data, Directive Monitoring, Tindak Lanjut, and User Management. Designed positive/negative scenarios: required-field validation, special characters, invalid type/format, and file upload limits. Executed manual functional testing and UAT for CRUD, search, filter, sorting, pagination, column visibility, multi-role workflows (submission, review, revision, approval), and role-based access control. Logged defects, documented results (OK/NOT OK, explanation, notes), performed retesting with developers, and managed daily tasks in ClickUp, Office, and MS Office.",
      id: "Magang QA di PT Qtasnim Digital Teknologi. Menyusun 100+ test case UAT (script test, prosedur pengujian, expected result) untuk aplikasi web Matrix Tindak Lanjut, mencakup modul Master Data, Directive Monitoring, Tindak Lanjut, dan User Management. Merancang skenario positif dan negatif: validasi field wajib, input karakter khusus, input huruf pada field angka/tanggal, dan batas ukuran unggah file. Menjalankan functional testing manual dan UAT untuk CRUD, pencarian, filter, sorting, pagination, column visibility, alur kerja multi-peran (pengajuan, review, revisi, persetujuan), serta pembatasan akses data sesuai peran. Mencatat temuan bug, mendokumentasikan hasil (OK/NOT OK, penjelasan, catatan), melakukan retesting verifikasi perbaikan bersama developer, dan mengelola pekerjaan harian menggunakan ClickUp, Office, dan MS Office.",
    },
    srcImage: "/img/projects/qtasnim-qa/uat-qtasnim.webp",
    images: [
      "/img/projects/qtasnim-qa/uat-qtasnim.webp",
      "/img/projects/qtasnim-qa/bug-uat-qtasnim.webp",
    ],
    tags: {
      en: ["Manual Testing", "UAT", "Test Case", "Bug Reporting", "ClickUp", "Office", "MS Office", "Functional Testing"],
      id: ["Manual Testing", "UAT", "Test Case", "Bug Reporting", "ClickUp", "Office", "MS Office", "Fungsional Testing"],
    },
    icons: ["ClickUp"],
  },
];
