'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE_CONFIG, localizeHref, type Locale } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { CTAButton } from '@/components/ui/cta-button';
import { Logo } from './logo';
import { MobileCTABar } from './mobile-cta-bar';

const FIRST_NAV_KEY = SITE_CONFIG.nav[0].key;
const FIRST_NAV_HREF = SITE_CONFIG.nav[0].href;

function routeKey(pathname: string) {
  const path = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (path.startsWith(FIRST_NAV_HREF)) return FIRST_NAV_KEY;
  return SITE_CONFIG.nav.find((item) => item.href !== FIRST_NAV_HREF && path.startsWith(item.href))?.key;
}

export function Header({ locale, languageHref }: { locale: Locale; languageHref?: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const otherLocaleHref = languageHref ?? localizeHref(pathname.replace(/^\/en(?=\/|$)/, '') || '/', locale === 'en' ? 'zh' : 'en');
  const activeKey = routeKey(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const root = document.documentElement, previous = root.style.overflow;
    root.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { root.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const navLink = (item: (typeof SITE_CONFIG.nav)[number]) => {
    const active = activeKey === item.key;
    return (
      <Link
        key={item.key}
        href={localizeHref(item.href, locale)}
        aria-current={active ? 'page' : undefined}
        className={cn('relative flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-white', (active || hoverKey === item.key) && 'text-white')}
        onMouseEnter={() => setHoverKey(item.key)}
        onMouseLeave={() => setHoverKey(null)}
      >
        <span className="relative">{t(item.key)}
        {active && <motion.span layoutId="desktop-nav-indicator" className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 440, damping: 38 }} />}</span>
      </Link>
    );
  };

  return (
    <>
      <header className="bg-transparent px-0 transition-all duration-300 lg:px-3 lg:pt-3">
        <div data-scrolled={scrolled} className="site-header-panel mx-auto max-w-[1240px] rounded-none border-x-0 border-transparent bg-transparent shadow-none backdrop-blur-none transition-all duration-300 lg:rounded-[1.25rem] lg:border-x">
          <div className="site-container flex h-16 items-center justify-between gap-5 xl:h-[4.5rem]">
            <Logo locale={locale} />
            <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Primary navigation">
              {SITE_CONFIG.nav.map(navLink)}
            </nav>
            <div className="hidden items-center gap-1 lg:flex">
              <Link href={otherLocaleHref} className="flex min-h-11 items-center px-3 text-sm font-medium text-muted-foreground transition hover:text-white">{t('language')}</Link>
              <CTAButton locale={locale} className="ml-1 min-h-10 px-4 text-sm" />
            </div>
            <button className="flex size-11 items-center justify-center rounded-md text-muted-foreground transition hover:bg-white/[0.06] hover:text-white lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? t('close') : t('menu')}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
          <AnimatePresence initial={false}>
          {open && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="site-container max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border py-4 pb-24 lg:hidden" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {SITE_CONFIG.nav.map((item, index) => {
                  const active = activeKey === item.key;
                  return <motion.li key={item.key} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + index * 0.04, duration: 0.35 }}><Link onClick={() => setOpen(false)} className={cn('flex min-h-12 items-center rounded-md border-l-2 border-transparent px-3 font-medium text-muted-foreground', active && 'border-accent bg-white/[0.05] text-white')} href={localizeHref(item.href, locale)}>{t(item.key)}</Link></motion.li>;
                })}
              </ul>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <Link href={otherLocaleHref} className="flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium">{t('language')}</Link>
              </div>
            </motion.nav>
          )}
          </AnimatePresence>
        </div>
      </header>
      <MobileCTABar locale={locale} />
    </>
  );
}
