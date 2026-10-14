'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Locale } from '@/lib/site-config';
import { mockContent, type CapabilityTask } from '@/lib/mock-content';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/reveal';
import { TaskVisual, type TaskVisualLabels } from '@/components/motion/task-visuals';
import { MMetricsDemo } from '@/components/hero/MMetricsDemo';

function CapabilityMedia({ task, available, labels }: { task: CapabilityTask; available: boolean; labels: TaskVisualLabels }) {
  const [failed, setFailed] = useState(false);
  return <div className="capability-media">
    {!available || failed ? <TaskVisual id={task.id} labels={labels}/> : /\.(webp|png|jpe?g|gif|svg)$/i.test(task.media) ?
      <Image src={task.media} alt={task.title} fill sizes="(min-width:1024px) 840px, 100vw" className="object-contain" onError={() => setFailed(true)}/> :
      <video src={task.media} controls playsInline preload="metadata" aria-label={task.title} onError={() => setFailed(true)}/>}
  </div>;
}

function TwoColumnCard({
  index,
  textBlock,
  mediaBlock,
}: {
  index: number;
  textBlock: React.ReactNode;
  mediaBlock: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      className="grid gap-8 lg:grid-cols-2 lg:gap-16"
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {isReversed ? (
        <>
          <div className="order-2 lg:order-1">{mediaBlock}</div>
          <div className="order-1 lg:order-2">{textBlock}</div>
        </>
      ) : (
        <>
          <div>{textBlock}</div>
          <div>{mediaBlock}</div>
        </>
      )}
    </motion.article>
  );
}

function CapabilityCard({
  task, displayIndex, available, labels,
}: {
  task: CapabilityTask; displayIndex: number; available: boolean; labels: TaskVisualLabels;
}) {
  const textBlock = (
    <div className="flex flex-col justify-center">
      <span className="eyebrow">0{displayIndex}</span>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{task.title}</h3>
      {task.brief && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{task.brief}</p>}
      {task.situation && (
        <div className="mt-5 max-w-xl">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">{task.situation}</p>
        </div>
      )}
    </div>
  );

  const mediaBlock = (
    <CapabilityMedia task={task} available={available} labels={labels}/>
  );

  // layoutIndex 从 0 开始用于交替布局：0=左文右图, 1=左图右文
  const layoutIndex = displayIndex - 1;
  return <TwoColumnCard index={layoutIndex} textBlock={textBlock} mediaBlock={mediaBlock} />;
}

function ExplainableResultsCard({ locale, displayIndex }: { locale: Locale; displayIndex: number }) {
  const t = useTranslations('home.results');

  const textBlock = (
    <div className="flex flex-col justify-center">
      <span className="eyebrow">{t('eyebrow')}</span>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{t('title')}</h3>
      {t('brief') && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t('brief')}</p>}
      {t('description') && (
        <div className="mt-5 max-w-xl">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">{t('description')}</p>
        </div>
      )}
    </div>
  );

  const mediaBlock = (
    <div className="capability-media">
      <MMetricsDemo locale={locale} autoLoad />
    </div>
  );

  const layoutIndex = displayIndex - 1;
  return <TwoColumnCard index={layoutIndex} textBlock={textBlock} mediaBlock={mediaBlock} />;
}

export function TasksSection({ locale, availableMedia = [] }: { locale: Locale; availableMedia?: string[] }) {
  const t = useTranslations('home.tasks');
  const translated = t.raw('selectorTasks') as CapabilityTask[];
  const tasks = locale === 'zh' ? mockContent.capabilities.tasks : translated;

  // 结构预测（第1个）
  const structureTask = tasks[0];
  // 剩余的3个（亲和力优化、稳定性、从头设计）
  const remainingTasks = tasks.slice(1);

  return (
    <section className="home-section-pad py-24" data-nav-section="platform">
      <div className="site-container">
        <Reveal>
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('selectorDescription')} className="[&_.section-title]:!text-[clamp(2.2rem,4.5vw,3.6rem)]"/>
        </Reveal>
        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {/* 01｜结构预测 */}
          <CapabilityCard
            task={structureTask}
            displayIndex={1}
            available={availableMedia.includes(structureTask.media)}
            labels={t.raw('visual') as TaskVisualLabels}
          />

          {/* 02｜可解释的结果 */}
          <ExplainableResultsCard locale={locale} displayIndex={2} />

          {/* 03-05｜剩余能力 */}
          {remainingTasks.map((task, i) => (
            <CapabilityCard
              key={task.id}
              task={task}
              displayIndex={i + 3}
              available={availableMedia.includes(task.media)}
              labels={t.raw('visual') as TaskVisualLabels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
