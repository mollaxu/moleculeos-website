'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BookOpen, HelpCircle, Zap, History, Code } from 'lucide-react';
import { localizeHref, type Locale } from '@/lib/site-config';
import { DocsSearch } from '@/components/docs/docs-search';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EnterpriseSection } from '@/components/sections/enterprise-section';
import { cn } from '@/lib/utils';

const helpNavItems = [
  { key: 'coreFeatures', label: '核心功能', icon: Zap },
  { key: 'apiKey', label: 'API key', icon: Code },
  { key: 'mcpService', label: 'MCP服务', icon: BookOpen },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
];

function CoreFeaturesContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">核心功能</h2>
      <p className="mt-3 text-muted-foreground">MoleculeOS 平台核心能力介绍</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">核心功能介绍内容待补充。</p>
      </div>
    </div>
  );
}

function ApiKeyContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">API Key</h2>
      <p className="mt-3 text-muted-foreground">通过 API 将 MOS 能力集成到你的研发流程中</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">API 文档与接入指南正在整理中，即将开放。</p>
      </div>
    </div>
  );
}

function McpServiceContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">MCP 服务</h2>
      <p className="mt-3 text-muted-foreground">Model Context Protocol 服务接入</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">MCP 服务接入方案正在开发中，敬请期待。</p>
      </div>
    </div>
  );
}

function FaqContent({ locale }: { locale: Locale }) {
  const docs = useTranslations('docsPage');
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">常见问题</h2>
      <p className="mt-3 text-muted-foreground">关于定价、任务与数据管理的常见问题</p>
      <div className="mt-10 max-w-[760px]">
        <Accordion type="single" collapsible>
          {(docs.raw('faqs') as string[][]).map((faq, i) => (
            <AccordionItem key={i} value={'faq-' + i}>
              <AccordionTrigger>{faq[0]}</AccordionTrigger>
              <AccordionContent>{faq[1]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mt-16 -mx-5 md:-mx-8 xl:-mx-0">
        <EnterpriseSection locale={locale} />
      </div>
    </div>
  );
}

export function HelpPage({ locale, kind = 'home' }: { locale: Locale; kind?: 'home' | 'getting-started' | 'faq' | 'changelog' | 'api' }) {
  const t = useTranslations('helpPage');
  const docs = useTranslations('docsPage');
  const ui = useTranslations('manualUI');
  const [activeTab, setActiveTab] = useState('coreFeatures');

  const entries = [
    { key: 'getting-started', title: docs('quickStart'), description: ui('quickStartDescription'), Icon: Zap },
    { key: 'manual', title: docs('manual'), description: ui('manualDescription'), Icon: BookOpen },
    { key: 'faq', title: docs('faq'), description: ui('faqDescription'), Icon: HelpCircle },
    { key: 'changelog', title: t('changelog'), description: t.raw('todo') as string, Icon: History },
    { key: 'api', title: t('api'), description: t.raw('todo') as string, Icon: Code }
  ];
  const selected = entries.find(e => e.key === kind);

  // kind !== 'home' 时保持原有子页面逻辑
  if (kind !== 'home') {
    return (
      <article className="site-container py-24">
        <Link href={localizeHref('/help', locale)} className="mb-6 inline-flex text-sm text-muted-foreground">← {t('title')}</Link>
        <h1 className="section-title">{selected?.title ?? t('title')}</h1>
        <p className="section-copy">{kind === 'getting-started' ? docs('quickDescription') : selected?.description}</p>
        {kind === 'getting-started' && <Link href={localizeHref('/help/manual', locale)} className="mt-8 inline-flex min-h-11 items-center text-[var(--accent-text)]">{ui('openManual')}</Link>}
        {kind === 'faq' && <><div className="mt-12 max-w-[760px]"><Accordion type="single" collapsible>{(docs.raw('faqs') as string[][]).map((faq, i) => <AccordionItem key={i} value={'faq-' + i}><AccordionTrigger>{faq[0]}</AccordionTrigger><AccordionContent>{faq[1]}</AccordionContent></AccordionItem>)}</Accordion></div><div className="mt-16 -mx-5 md:-mx-8 xl:-mx-0"><EnterpriseSection locale={locale} /></div></>}
        {(kind === 'api' || kind === 'changelog') && <p className="mt-8 text-muted-foreground">{t('soon')}</p>}
      </article>
    );
  }

  return (
    <article className="site-container py-24">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        {/* 左侧导航 */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav className="flex flex-col gap-1" aria-label="Help navigation">
            {helpNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2.5 text-sm text-left transition-colors hover:text-white',
                    activeTab === item.key && 'border-accent bg-white/[0.05] text-white'
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-8 max-w-[480px]">
            <DocsSearch locale={locale} />
          </div>
        </aside>

        {/* 中间内容区 */}
        <main>
          {activeTab === 'coreFeatures' && <CoreFeaturesContent />}
          {activeTab === 'apiKey' && <ApiKeyContent />}
          {activeTab === 'mcpService' && <McpServiceContent />}
          {activeTab === 'faq' && <FaqContent locale={locale} />}
        </main>
      </div>
    </article>
  );
}
