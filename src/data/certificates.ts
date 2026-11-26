export interface RawCertificate {
  title: string;
  urlDirect?: string;
  published: string;
  srcImage: string;
  /** Halaman tambahan sertifikat (lembar hasil, lampiran, dll). */
  pages?: { src: string; label: string }[];
  /** Satu halaman gambar tambahan (lembar hasil). */
  srcImageSecondary?: string;
  secondaryLabel?: string;
  /** Detail lengkap sertifikat (label/value), mis. nomor, peserta, periode, jam, penandatangan. */
  facts?: { label: string; value: string }[];
  thisAcademic: boolean;
  best?: boolean;
  tags?: string[];
  description?: string;
}

export const rawCertificates: RawCertificate[] = [
  {
    title:
      "Red Hat System Administration I (RH124) — Certificate of Attendance",
    published: "Mei 2024",
    srcImage: "/img/certificate/redhat.webp",
    thisAcademic: true,
    best: true,
    tags: [
      "Red Hat",
      "Linux",
      "System Administration",
      "RHEL",
      "RH124",
      "Verified",
    ],
    description:
      "Red Hat System Administration I (RH124) designed for IT professionals building core Linux administration competence. Core focus: RHEL ecosystem, command line & shell environments, file management & permissions, user/group security policies, systemd service control, remote access via web console & SSH, network interface config, and software management via DNF.",
    facts: [
      { label: "Penyelenggara", value: "Red Hat Training and Certification" },
      { label: "Pelatihan", value: "Red Hat System Administration I (RH124)" },
      { label: "Jenis", value: "Certificate of Attendance" },
      { label: "Tanggal terbit", value: "Mei 2024" },
      { label: "Materi Utama", value: "RHEL OS, Shell, File Permissions, Users/Groups, systemd, SSH, DNF Package Management" }
    ],
  },
  {
    title:
      "Junior Network Administrator — Vocational School Graduate Academy (VSGA) · KOMINFO",
    published: "Jun - Jul 2023",
    srcImage: "/img/certificate/vsga-1.webp",
    srcImageSecondary: "/img/certificate/vsga-2.webp",
    secondaryLabel: "Halaman 2",
    pages: [
      { src: "/img/certificate/vsga-1.webp", label: "Halaman 1: Sertifikat Kelulusan" },
      { src: "/img/certificate/vsga-2.webp", label: "Halaman 2: Lembar Hasil / Transkrip" },
      { src: "/img/certificate/vsga-3.webp", label: "Halaman 3: Fakta Integritas / Pendukung" }
    ],
    facts: [
      { label: "Nomor Sertifikat", value: "19362761140-27/VSGA/BLSDM.Kominfo/2023" },
      { label: "Peserta", value: "MASKANI" },
      { label: "Periode Pelatihan", value: "13 Juni 2023 - 28 Juli 2023" },
      { label: "Durasi", value: "90 Jam Pelatihan (JP)" },
      { label: "Penandatangan", value: "Hary Budiarto (Kepala Badan Litbang & SDM Kominfo)" },
      { label: "Kompetensi", value: "Perancangan Topologi Jaringan, Routing & Switching, IP Addressing, DNS/DHCP, LAN & Wi-Fi, Troubleshooting Konektivitas" }
    ],
    thisAcademic: true,
    best: true,
    tags: [
      "KOMINFO",
      "VSGA",
      "Network Administrator",
      "Networking",
      "90 Jam",
      "Verified",
    ],
    description:
      "Pelatihan Junior Network Administrator (90 JP) Program Digital Talent Scholarship KOMINFO. Mempelajari perancangan topologi jaringan, konfigurasi router & switch, pengalamatan IP (IPv4/IPv6), layanan DHCP/DNS, manajemen LAN & Wi-Fi, teknik crimping kabel, dan troubleshooting konektivitas jaringan enterprise. Lulus uji kompetensi standar SKKNI.",
  },
];
