import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { S, waLink } from '../../data/site';
import { isFinePointer, isReducedMotion } from '../../lib/utils';
import { CountUp, InteractiveTitle, useReveal } from '../../hooks/useReveal';
import { CertCard, ProjectCard } from '../Cards';
import { useLanguage } from '../../lib/catalog';
import { isGithubEnabled } from '../../config/Features';
import { SkillLogo } from '../SkillLogo';
import { FaqList } from '../FaqList';
import { ProcessSteps } from '../ProcessSteps';

/* ---------- Marquee: speed follows scroll ---------- */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const mq = ref.current;
    if (!mq || isReducedMotion()) return;
    let mx = 0;
    let dir = -1;
    let vel = 0;
    let lastY = scrollY;
    let raf = 0;
    // Read inside the loop; toggled by an IntersectionObserver. Declared here
    // so the first frame can never hit the temporal dead zone.
    let paused = false;
    const onScroll = () => {
      const d = scrollY - lastY;
      lastY = scrollY;
      vel = Math.max(-40, Math.min(40, d));
      if (d) dir = d > 0 ? -1 : 1;
    };
    addEventListener('scroll', onScroll, { passive: true });
    const loop = () => {
      raf = requestAnimationFrame(loop);
      // A permanently-running rAF that writes `transform` every frame keeps
      // the main thread and the compositor awake for the whole session, even
      // once the strip is thousands of pixels above the viewport. Parking the
      // loop while it is off-screen costs nothing visually and is the single
      // biggest scroll-smoothness win on a phone.
      if (paused) return;
      vel *= 0.92;
      mx += dir * (0.7 + Math.abs(vel) * 0.35);
      const w = mq.scrollWidth / 2;
      if (mx <= -w) mx += w;
      if (mx > 0) mx -= w;
      mq.style.transform = `translate3d(${mx}px,0,0)`;
    };
    const io = new IntersectionObserver(
      ([en]) => {
        paused = !en.isIntersecting;
        // Resync so a resumed loop does not jump by the distance scrolled.
        lastY = scrollY;
      },
      { rootMargin: '120px' },
    );
    io.observe(mq);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="strip" aria-label={lang === 'en' ? 'Tech stack' : 'Teknologi'}>
      <div className="mq" ref={ref}>
        {S.stack.map((t) => (
          <span key={t}>
            <SkillLogo tech={t} />
            {t}
          </span>
        ))}
        {S.stack.map((t) => (
          <span key={'b' + t} aria-hidden="true">
            <SkillLogo tech={t} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  id,
  kick,
  title,
  children,
}: {
  id: string;
  kick: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sec" id={id}>
      <div className="kick rv">{kick}</div>
      <InteractiveTitle text={title} className="sec-title" />
      {children}
    </section>
  );
}

/* ---------- Skill cloud: flees the cursor, click = ripple ---------- */
function Cloud() {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const cloud = ref.current;
    if (!cloud || !isFinePointer() || isReducedMotion()) return;
    const btns = Array.from(cloud.querySelectorAll<HTMLElement>('button'));
    const onMove = (e: PointerEvent) => {
      btns.forEach((b) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const R = 130;
        if (d < R && d > 0) {
          const f = (1 - d / R) * 26;
          b.style.setProperty('--tx', ((-dx / d) * f).toFixed(1) + 'px');
          b.style.setProperty('--ty', ((-dy / d) * f).toFixed(1) + 'px');
        } else {
          b.style.setProperty('--tx', '0px');
          b.style.setProperty('--ty', '0px');
        }
      });
    };
    const onLeave = () =>
      btns.forEach((b) => {
        b.style.setProperty('--tx', '0px');
        b.style.setProperty('--ty', '0px');
      });
    cloud.addEventListener('pointermove', onMove);
    cloud.addEventListener('pointerleave', onLeave);
    return () => {
      cloud.removeEventListener('pointermove', onMove);
      cloud.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const id = ++idRef.current;
    setRipples((list) => [...list, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((list) => list.filter((x) => x.id !== id)), 800);
    b.classList.add('pop');
    setTimeout(() => b.classList.remove('pop'), 500);
  };

  return (
    <div className="cloud rv" id="cloud" aria-label={lang === 'en' ? 'Tech stack' : 'Teknologi'} ref={ref} onClick={onClick}>
      <p className="cloud-hint">{lang === 'en' ? 'Hover a skill' : 'Dekatkan kursor ke skill'}</p>
      {S.stack.map((t) => (
        <button type="button" key={t}>
          <SkillLogo tech={t} />
          {t}
        </button>
      ))}
      {ripples.map((r) => (
        <i className="rp" key={r.id} style={{ left: r.x, top: r.y }} />
      ))}
    </div>
  );
}

/* ---------- GitHub contribution heatmap (real data) ---------- */
interface Day {
  date: string;
  count: number;
  level: number;
}

/** Deterministic placeholder so the grid has a shape while data loads. */
const skeletonDays = (): Day[] => {
  const out: Day[] = [];
  const now = new Date();
  let s = 7;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 370; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 864e5);
    const w = d.getUTCDay();
    const r = rnd();
    const c = w === 0 || w === 6 ? (r > 0.7 ? Math.floor(r * 3) : 0) : r > 0.5 ? Math.floor(r * 6) : 0;
    out.push({ date: d.toISOString().slice(0, 10), count: c, level: c === 0 ? 0 : c < 2 ? 1 : c < 4 ? 2 : c < 7 ? 3 : 4 });
  }
  return out;
};

type GhContribution = { date: string; count: number; level: number };
type GhResponse = {
  contributions?: Array<{ date: string; count: number; level: number }>;
  total?: Record<string, number>;
};

const toDays = (res: GhResponse): Day[] => {
  const list = res.contributions ?? [];
  return list.map((c) => {
    const count = Number((c as GhContribution & { count?: number }).count ?? 0);
    const level = Number((c as GhContribution & { level?: number; intensity?: number }).level ?? 0);
    return { date: c.date, count, level };
  });
};

function Heatmap() {
  const { lang } = useLanguage();
  const [state, setState] = useState<{ days: Day[]; live: boolean; loading: boolean }>({
    days: skeletonDays(),
    live: false,
    loading: true,
  });
  const hmRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ text: string; x: number; y: number } | null>(null);
  const t = (en: string, id: string) => (lang === 'id' ? id : en);

  useEffect(() => {
    let cancelled = false;
    // Public contributions API — no token needed, CORS enabled.
    fetch(`https://github-contributions-api.jogruber.de/v1/${S.github}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('request failed'))))
      .then((d: GhResponse) => {
        if (cancelled) return;
        const days = toDays(d);
        if (!days.length) throw new Error('empty payload');
        setState({ days, live: true, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, live: false, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const days = state.days;
    let tot = 0;
    let best = 0;
    let run = 0;
    days.forEach((d) => {
      tot += d.count;
      run = d.count ? run + 1 : 0;
      best = Math.max(best, run);
    });
    return { tot, best };
  }, [state.days]);

  useEffect(() => {
    const hm = hmRef.current;
    if (!hm) return;
    const cells = Array.from(hm.querySelectorAll<HTMLElement>('i[data-tip]'));
    const onMove = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>('i[data-tip]');
      if (!c) return;
      const k = cells.indexOf(c);
      cells.forEach((x) => x.classList.remove('h0', 'h1', 'h2'));
      c.classList.add('h0');
      [k - 1, k + 1, k - 7, k + 7].forEach((j) => cells[j]?.classList.add('h1'));
      [k - 2, k + 2, k - 14, k + 14, k - 8, k - 6, k + 6, k + 8].forEach((j) => cells[j]?.classList.add('h2'));
      const r = c.getBoundingClientRect();
      setHover({ text: c.dataset.tip ?? '', x: r.left + r.width / 2, y: r.top });
    };
    const onLeave = () => {
      cells.forEach((x) => x.classList.remove('h0', 'h1', 'h2'));
      setHover(null);
    };
    hm.addEventListener('pointermove', onMove);
    hm.addEventListener('pointerleave', onLeave);
    return () => {
      hm.removeEventListener('pointermove', onMove);
      hm.removeEventListener('pointerleave', onLeave);
    };
    // Re-bind after data loads: the handler caches the cell list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.days]);

  const first = state.days[0];
  const off = first ? new Date(first.date + 'T00:00:00Z').getUTCDay() : 0;
  const dayLabel = (d: Day) => {
    const n = d.count;
    return lang === 'en'
      ? `${n} contribution${n === 1 ? '' : 's'} · ${d.date}`
      : `${n} kontribusi · ${d.date}`;
  };

  return (
    <Section id="github" kick={t('Activity', 'Aktivitas')} title={t('Shipping code, every week.', 'Ngoding tiap minggu, terlihat.')}>
      <div className="ghh rv">
        <div>
          <b>
            {state.loading ? <span className="lv-skel" style={{ display: 'inline-block', width: '4rem', height: '1em' }} /> : <CountUp value={stats.tot} />}
          </b>
          <small>{t('contributions in the last year', 'kontribusi setahun terakhir')}</small>
        </div>
        <div>
          <b>
            {state.loading ? <span className="lv-skel" style={{ display: 'inline-block', width: '3rem', height: '1em' }} /> : <CountUp value={stats.best} />}
          </b>
          <small>{t('longest daily streak', 'streak harian terpanjang')}</small>
        </div>
      </div>
      <div className="hmw rv" style={{ opacity: state.live || state.loading ? undefined : 0.55 }}>
        <div className="hm" ref={hmRef} aria-hidden="true">
          {Array.from({ length: off }, (_, i) => (
            <i key={'o' + i} style={{ visibility: 'hidden' }} />
          ))}
          {state.days.map((d, k) => (
            <i key={k} data-l={d.level} data-tip={dayLabel(d)} />
          ))}
        </div>
      </div>
      <p className="gh-note">
        {state.loading ? (
          t('Loading contributions…', 'Memuat kontribusi…')
        ) : state.live ? (
          <>
            {t('Live data from', 'Data langsung dari')}{' '}
            <a href={S.social.github} target="_blank" rel="noopener">
              github.com/{S.github}
            </a>
            .
          </>
        ) : (
          t(
            'GitHub is unreachable right now — showing a placeholder grid. Open the profile for live activity.',
            'GitHub tidak dapat dijangkau saat ini — menampilkan grid contoh. Buka profil untuk aktivitas langsung.',
          )
        )}
      </p>
      {hover && (
        <div className="tip on" style={{ transform: `translate(${hover.x}px,${hover.y}px) translate(-50%,-140%)` }}>
          {hover.text}
        </div>
      )}
    </Section>
  );
}

export function KeyFacts() {
  const { lang } = useLanguage();
  const totalCerts = S.certs.reduce((n, c) => n + c.count, 0);
  const facts = [
    {
      k: { en: 'Who', id: 'Siapa' },
      v: { en: `${S.name} — QA manual tester and junior IT/network support.`, id: `${S.name} — QA manual tester dan junior IT/network support.` },
    },
    {
      k: { en: 'Based in', id: 'Berbasis di' },
      v: { en: 'Indramayu, West Java, Indonesia · GMT+7 (WIB)', id: 'Indramayu, Jawa Barat, Indonesia · GMT+7 (WIB)' },
    },
    {
      k: { en: 'Education', id: 'Pendidikan' },
      v: {
        en: 'D4 Software Engineering, Politeknik Negeri Indramayu — GPA 3.55/4.00',
        id: 'D4 Rekayasa Perangkat Lunak, Politeknik Negeri Indramayu — IPK 3,55/4,00',
      },
    },
    {
      k: { en: 'Experience', id: 'Pengalaman' },
      v: {
        en: `${S.career.length} roles: QA, frontend, and IT support`,
        id: `${S.career.length} peran: QA, frontend, dan IT support`,
      },
    },
    {
      k: { en: 'Focus', id: 'Fokus' },
      v: {
        en: 'Manual testing, UAT, bug reporting, helpdesk, MikroTik RouterOS, networking, CCTV',
        id: 'Manual testing, UAT, pelaporan bug, helpdesk, MikroTik RouterOS, jaringan, CCTV',
      },
    },
    {
      k: { en: 'Thesis', id: 'Skripsi' },
      v: {
        en: 'K-METRIC — MikroTik traffic monitoring with K-Means anomaly detection (1,500 records, 98.33% agreement)',
        id: 'K-METRIC — monitoring trafik MikroTik dengan deteksi anomali K-Means (1.500 data, kesesuaian 98,33%)',
      },
    },
    {
      k: { en: 'Certified in', id: 'Sertifikasi' },
      v: {
        en: `Junior Network Administrator (VSGA, 90 hours) and Red Hat System Administration I (RH124) Certificate of Attendance — ${totalCerts} credentials in total`,
        id: `Junior Network Administrator (VSGA, 90 jam) dan Red Hat System Administration I (RH124) Certificate of Attendance — total ${totalCerts} kredensial`,
      },
    },
    {
      k: { en: 'Languages', id: 'Bahasa' },
      v: { en: 'English, Bahasa Indonesia', id: 'Inggris, Bahasa Indonesia' },
    },
    {
      k: { en: 'Contact', id: 'Kontak' },
      v: { en: `${S.email} · WhatsApp · replies within 24 hours`, id: `${S.email} · WhatsApp · dibalas dalam 24 jam` },
    },
  ];
  return (
    <div className="kfacts rv" aria-label={lang === 'en' ? 'Key facts' : 'Fakta singkat'}>
      <h3>{lang === 'en' ? 'Key facts' : 'Fakta singkat'}</h3>
      <dl>
        {facts.map((f) => (
          <div key={f.k.en}>
            <dt>{(f.k as Record<string, string>)[lang] || f.k.en}</dt>
            <dd>{(f.v as Record<string, string>)[lang] || f.v.en}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import { useIsMobile } from '../../hooks/useMediaQuery';

/* ---------- Home page sections ---------- */

/** How many project cards the homepage shows. Phones get fewer: the cards are
    full-width there, so each one costs a screenful plus its thumbnail. */
const HOME_PROJECTS_DESKTOP = 2;
const HOME_PROJECTS_MOBILE = 2;

export function HomeSections() {
  const rootRef = useReveal();
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const t = (en: string, id: string) => (lang === 'id' ? id : en);

  // Sliced from the front of `featuredProjects`. Note that the best-first
  // ordering in `site.ts` currently has no effect (see the comment on
  // BEST_ORDER), so this is the authoring order in `projects.ts` — not a
  // curated ranking. The rest stay one click away via "All N projects", and
  // every counter elsewhere still reports the true total.
  const shownProjects = S.featuredProjects.slice(0, isMobile ? HOME_PROJECTS_MOBILE : HOME_PROJECTS_DESKTOP);

  return (
    <div ref={rootRef}>
      <Marquee />

      <Section
        id="projects"
        kick={t('Projects', 'Proyek')}
        title={t('Built and shipped, not just designed.', 'Dibangun dan dirilis, bukan sekadar dirancang.')}
      >
        <div className="pg">
          {shownProjects.map((p) => {
            // `i` must be the index inside the FULL project list so the modal
            // opens the right item (prev/next steps through all projects).
            const fullIndex = S.projects.findIndex((x) => x.id === p.id);
            return <ProjectCard key={p.id} p={p} i={fullIndex} />;
          })}
        </div>
        <p className="rv" style={{ marginTop: '1.5rem' }}>
          <Link className="btn2" to="/projects">
            {t(`All ${S.projects.length} projects`, `Semua ${S.projects.length} proyek`)} →
          </Link>
        </p>
      </Section>

      {/* Order follows the order a prospect's questions are actually answered:
          "can they do the work?" (projects) → "how do I start?" (process + FAQ) →
          "who is this person?" → credentials → CTA.
          Testimonials, pricing and client counters were removed per PRD
          (entry-level portfolio: no invented social proof). */}

      <Section
        id="how"
        kick={t('How it works', 'Cara kerjanya')}
        title={t('From first message to fixed.', 'Dari pesan pertama sampai beres.')}
      >
        <ProcessSteps />
        <div className="home-faq">
          <h3 className="rv">{t('Common questions.', 'Pertanyaan umum.')}</h3>
          <FaqList limit={4} compact />
          <p className="rv">
            <Link className="btn2" to="/contact">
              {t('All questions & the contact form', 'Semua pertanyaan & form kontak')} →
            </Link>
          </p>
        </div>
      </Section>


      <Section id="about" kick={t('About', 'Tentang')} title={t('QA and IT support, grounded in real work.', 'QA dan IT support, dibangun dari kerja nyata.')}>
        <div className="ab">
          <div>
            <p className="big rv">
              {t(
                'I am Maskani, a D4 Software Engineering graduate from Politeknik Negeri Indramayu (GPA 3.55/4.00). My work sits between software quality assurance and IT/network support.',
                'Saya Maskani, lulusan D4 Rekayasa Perangkat Lunak Politeknik Negeri Indramayu (IPK 3,55/4,00). Fokus saya ada di persimpangan software quality assurance dan IT/network support.',
              )}
            </p>
            <p className="big rv">
              {t(
                'In QA, I handled manual testing and UAT at PT Qtasnim Digital Teknologi: test scenarios, test cases, bug reporting, and retesting with developers. In IT support, I worked on hardware/software troubleshooting, Windows and printer setup, LAN/proxy/MikroTik networking, and CCTV maintenance during internships at Diskominfo Indramayu and PT Dirgantara Indonesia.',
                'Di QA, saya menangani manual testing dan UAT di PT Qtasnim Digital Teknologi: skenario uji, test case, pelaporan bug, dan retesting bersama developer. Di IT support, saya menangani troubleshooting hardware/software, instalasi Windows dan printer, jaringan LAN/proxy/MikroTik, serta pemeliharaan CCTV saat magang di Diskominfo Indramayu dan PT Dirgantara Indonesia.',
              )}
            </p>
            <p className="about-aka rv">
              {t(
                'I prefer clear documentation, reproducible checks, and fixes that can be verified.',
                'Saya mengutamakan dokumentasi jelas, pengecekan yang bisa diulang, dan perbaikan yang bisa diverifikasi.',
              )}
            </p>
            <Link className="btn2 rv" to="/career" style={{ display: 'inline-block', marginTop: '1.4rem' }}>
              {t('See the career timeline', 'Lihat perjalanan karier')} →
            </Link>
            <div className="nums">
              <div className="num rv">
                <b>
                  <CountUp value={S.projects.length} />
                </b>
                <small>{t('Projects', 'Proyek')}</small>
              </div>
              <div className="num rv">
                <b>
                  <CountUp value={S.career.length} />
                </b>
                <small>{t('Roles', 'Peran')}</small>
              </div>
              <div className="num rv">
                <b>
                  <CountUp value={S.certs.reduce((n, c) => n + c.count, 0)} />
                </b>
                <small>{t('Certificates', 'Sertifikat')}</small>
              </div>
            </div>
          </div>
          <div className="roles">
            <div className="role rv">
              <h4>{t('Software Quality Assurance', 'Software Quality Assurance')}</h4>
              <p>
                {t(
                  'Manual testing, Black Box Testing, UAT, retesting, bug reporting, and test case design.',
                  'Manual testing, Black Box Testing, UAT, retesting, pelaporan bug, dan perancangan test case.',
                )}
              </p>
            </div>
            <div className="role rv">
              <h4>{t('Junior IT & Network Support', 'Junior IT & Network Support')}</h4>
              <p>
                {t(
                  'Helpdesk, hardware and software troubleshooting, Windows and printer setup, MikroTik RouterOS, and LAN/networking.',
                  'Helpdesk, troubleshooting hardware dan software, instalasi Windows dan printer, MikroTik RouterOS, serta LAN/jaringan.',
                )}
              </p>
            </div>
          </div>
        </div>
        <KeyFacts />
        <Cloud />
      </Section>

      <Section id="certs" kick={t('Certificates', 'Sertifikat')} title={t('Validated skills.', 'Skill yang tervalidasi.')}>
        <div className="cg">
          {S.featuredCerts.map((c) => (
            <CertCard key={c.id} c={c} i={S.certs.findIndex((x) => x.id === c.id)} />
          ))}
        </div>
        <p className="rv" style={{ marginTop: '1.5rem' }}>
          <Link className="btn2" to="/certificates">
            {t(
              `All ${S.certs.reduce((n, c) => n + c.count, 0)} certificates`,
              `Semua ${S.certs.reduce((n, c) => n + c.count, 0)} sertifikat`,
            )}{' '}
            →
          </Link>
        </p>
      </Section>

      {isGithubEnabled() && <Heatmap />}

      <section className="cta-s" id="contact">
        <div className="big">
          <InteractiveTitle text={t('Need a hand with IT?', 'Butuh bantuan IT?')} as="span" />
          <InteractiveTitle text={t('Let\'s fix it.', 'Mari bereskan.')} as="span" className="o" />
        </div>
        <div className="cta-row rv">
          {/* One primary action. Four buttons of equal weight forced the
              visitor to choose between channels that the Contact page has
              already ranked (WhatsApp fastest) — the alternatives are now
              quiet text links. */}
          <a className="cta" href={waLink(lang)} target="_blank" rel="noopener">
            {t('Chat on WhatsApp', 'Chat WhatsApp')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="sr"> {t('(new tab)', '(tab baru)')}</span>
          </a>
          <span className="cta-alt">
            <a href={`mailto:${S.email}`} data-no-transition>
              {t('Email', 'Email')}
            </a>
            <Link to="/contact">{t('Contact form', 'Form kontak')}</Link>
            <Link to="/linktree">Linktree</Link>
          </span>
        </div>
      </section>
    </div>
  );
}

