import { S, waLink } from '../data/site';
import { CertificateGallery, PageHeader } from '../components/FilterGallery';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../lib/catalog';

/**
 * Certificate page. 31 raw credentials would make an endless grid, so the page
 * presents a curated flagship set first and groups the rest by credential kind
 * (competitions, national certification, courses, events, language). See
 * `src/data/certGroups.ts` for the taxonomy and `CertificateGallery` for the UI.
 */
export default function Certificates() {
  const ref = useReveal();
  const { lang } = useLanguage();
  const t = (en: string, id: string) => (lang === 'en' ? en : id);
  const total = S.certs.reduce((n, c) => n + c.count, 0);

  return (
    <div ref={ref}>
      <PageHeader
        crumb={t('Certificates', 'Sertifikat')}
        title={t('Proof of learning.', 'Bukti belajar.')}
        lead={t(
          `${total} credentials — certifications and training records, shown newest first.`,
          `${total} kredensial — sertifikat kompetensi nasional, hasil kompetisi, dan penyelesaian kursus. ${S.certsFeatured.length} yang paling membuktikan ditampilkan lebih dulu; sisanya dikelompokkan per jenis agar bisa dipindai dalam hitungan detik.`,
        )}
      >
        <p className="ph-cta rv">
          <a className="cta-ghost" href={waLink(lang)} target="_blank" rel="noopener">
            {t('Need IT support?', 'Butuh bantuan IT?')}
            <span className="sr"> {t('(opens WhatsApp)', '(membuka WhatsApp)')}</span>
          </a>
        </p>
      </PageHeader>
      <CertificateGallery all={S.certs} featured={S.certsFeatured} groups={S.certGroups} />
    </div>
  );
}
