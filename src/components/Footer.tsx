import { useState } from 'react';
import { Link } from 'react-router-dom';
import { S, waLink } from '../data/site';
import { useLocalClock } from '../hooks/useReveal';
import { useLanguage } from '../lib/catalog';
import { Brand } from './Logo';

export function Footer() {
  const clock = useLocalClock(S.tz, S.tzLabel);
  const [year] = useState(() => new Date().getFullYear());
  const { lang } = useLanguage();
  const t = (en: string, id: string) => (lang === 'id' ? id : en);

  return (
    <footer className="ft">
      <div>
        <Link className="brand" to="/">
          <Brand size={28} mark />
        </Link>
        <p>{t(`${S.role}. Troubleshooting, networking, and QA.`, `${S.role}. Troubleshooting, jaringan, dan QA.`)}</p>
        {/* Two CVs — one per career track — both serve from /public/cv. */}
        <div className="ft-dl">
          <span>{t('CV', 'CV')}</span>
          <a href={S.resume.qa} download>
            {t('CV: Software QA', 'CV Software QA')}
          </a>
          <a href={S.resume.it} download>
            {t('CV: IT Support & Network', 'CV IT Support & Network')}
          </a>
        </div>
      </div>
      <nav aria-label={t('Footer menu', 'Menu footer')}>
        <h2>{t('Menu', 'Menu')}</h2>
        <Link to="/">{t('Home', 'Beranda')}</Link>
        <Link to="/projects">{t('Projects', 'Proyek')}</Link>
        <Link to="/career">{t('Career', 'Karier')}</Link>
        <Link to="/certificates">{t('Certificates', 'Sertifikat')}</Link>
        <Link to="/contact">{t('Contact', 'Kontak')}</Link>
        <Link to="/linktree">Linktree</Link>
      </nav>
      <nav aria-label={t('Social media', 'Media sosial')}>
        <h2>{t('Social', 'Sosial')}</h2>
        <a href={waLink(lang)} target="_blank" rel="noopener">
          WhatsApp<span className="sr"> {t('(new tab)', '(tab baru)')}</span>
        </a>
        <a href={S.social.github} target="_blank" rel="noopener">
          GitHub<span className="sr"> {t('(new tab)', '(tab baru)')}</span>
        </a>
        <a href={S.social.instagram} target="_blank" rel="noopener">
          Instagram<span className="sr"> {t('(new tab)', '(tab baru)')}</span>
        </a>
        <a href={S.social.linkedin} target="_blank" rel="noopener">
          LinkedIn<span className="sr"> {t('(new tab)', '(tab baru)')}</span>
        </a>
      </nav>
      <div className="copy">
        <span>
          © {year} {S.name}. {t('All rights reserved.', 'Hak cipta dilindungi.')}
        </span>
        <span className="clk">
          <i />
          <span>{clock}</span>
        </span>
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {t('Back to top ↑', 'Kembali ke atas ↑')}
        </a>
      </div>
    </footer>
  );
}
