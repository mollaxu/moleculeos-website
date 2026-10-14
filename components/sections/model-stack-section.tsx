'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { localizeHref, type Locale } from '@/lib/site-config';
import { Reveal } from '@/components/motion/reveal';
import { Phrases } from '@/components/ui/phrase-title';

type Item = { name: string; description: string };

/**
 * Exploded view of the model system. On desktop the section pins while scrolling:
 * the three layers separate, then light up bottom-up (foundation → task models → scientific computing).
 */
export function ModelStackSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home.models');
  const items = t.raw('items') as Item[];
  const modalities = t.raw('modalities') as string[];
  const methods = t.raw('scienceMethods') as string[];
  const layerLabels = t.raw('layerLabels') as string[];
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const media = matchMedia('(min-width: 1024px)');
    const update = () => setPinned(media.matches && !reduce);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const spread = useTransform(scrollYProgress, [0.02, 0.3], [0, 1]);
  const tilt = useTransform(scrollYProgress, [0, 1], [-34, -46]);
  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (!pinned) return;
    setActive(value < 0.42 ? 0 : value < 0.7 ? 1 : 2);
  });

  // Steps follow the build-up order: the foundation first, then what is built on it.
  const layers = [
    { key: 'foundation', title: t('foundation'), body: t('foundationDescription'), chips: modalities, tone: 'violet', preview: '/demo/2bdn-preview.webp', previewAlt: '蛋白结构预测' },
    { key: 'tasks', title: t('taskModels'), body: t('taskModelsDescription'), chips: items.map(item => item.name), tone: 'pink', preview: null, previewAlt: '蛋白设计流程' },
    { key: 'science', title: t('scienceLayer'), body: t('scienceDescription'), chips: methods, tone: 'cyan', preview: '/demo/5xh3-platform-preview.png', previewAlt: 'MOS 软件界面' },
  ];
  const sceneStyle = (pinned ? { '--spread': spread, '--tilt': tilt } : { '--spread': 1, '--tilt': -40 }) as unknown as CSSProperties;

  return <section ref={root} className="model-stack" data-pinned={pinned || undefined} data-nav-section="models">
    <div className="model-stack-sticky">
      <div className="site-container model-stack-grid">
        <div className="model-stack-copy">
          <Reveal><p className="eyebrow eyebrow-solid">{t('eyebrow')}</p><h2 className="section-title"><Phrases text={t('title')} /></h2><p className="section-copy">{t('description')}</p></Reveal>
          <ol className="model-stack-steps">
            {[...layers].reverse().map((layer, reversedI) => {
              const i = layers.length - 1 - reversedI;
              return <li key={layer.key} data-active={!pinned || active === i || undefined} data-tone={layer.tone} onClick={() => setActive(i)}>
                <span className="model-stack-step-label">{layerLabels[i]}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </li>;
            })}
          </ol>
          <Link href={localizeHref('/platform#models', locale)} className="group mt-8 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#B6A6FF] transition-colors hover:text-white">
            {t('viewSystem')}<ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="model-stack-scene" aria-hidden="true">
          <motion.div className="model-stack-rig" style={sceneStyle}>
            {layers.map((layer, i) => <div key={layer.key} className="model-plate" data-tone={layer.tone} data-active={!pinned || active === i || undefined} style={{ '--i': i } as CSSProperties}>
              <span className="model-plate-name">{i === 0 ? 'MMFold' : i === 1 ? 'MMDesign' : 'MoleculeOS'}</span>
              <div className="model-plate-preview">
                {layer.preview ? (
                  <Image src={layer.preview} alt={layer.previewAlt} fill sizes="300px" className="object-cover" />
                ) : (
                  <div className="model-plate-preview-design">
                    <div className="mpd-helix" />
                    <div className="mpd-arrows">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </div>
              <div className="model-plate-chips">{layer.chips.map(chip => <span key={chip}>{chip}</span>)}</div>
            </div>)}
          </motion.div>
          <div className="model-stack-floor" />
        </div>
      </div>
    </div>
  </section>;
}
