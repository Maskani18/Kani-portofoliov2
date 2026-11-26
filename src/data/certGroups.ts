import type { CertGroup } from './site.ts';

/**
 * Certificate taxonomy for Maskani.
 * Both real credentials are industry/training records, so there is a single
 * professional group. Empty groups are intentionally not declared: the page
 * renders the group counts, and a "0" group is noise.
 */

export const CERT_GROUPS: CertGroup[] = [
  {
    id: 'professional',
    label: { en: 'Professional', id: 'Profesional' },
    desc: { en: 'Industry certifications and training', id: 'Sertifikasi dan pelatihan industri' },
    ids: [
      'red-hat-system-administration-i-rh124-certificate-of',
      'junior-network-administrator-vocational-school-graduate',
    ],
  },
];
