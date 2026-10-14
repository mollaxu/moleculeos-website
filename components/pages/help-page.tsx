'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BookOpen, HelpCircle, Zap, History, Code, Users } from 'lucide-react';
import { localizeHref, type Locale } from '@/lib/site-config';
import { DocsSearch } from '@/components/docs/docs-search';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EnterpriseSection } from '@/components/sections/enterprise-section';
import { cn } from '@/lib/utils';

const helpNavItems = [
  { key: 'coreFeatures', label: '核心功能', icon: Zap },
  { key: 'userCases', label: '用户案例', icon: Users },
  { key: 'apiKey', label: 'API key', icon: Code },
  { key: 'mcpService', label: 'MCP服务', icon: BookOpen },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
];

const coreFeatureSubs = [
  { key: 'structurePrediction', label: '结构预测' },
  { key: 'mmetrics', label: 'mmetrics' },
  { key: 'affinityOptimization', label: '亲和力优化' },
  { key: 'stabilityDevelopability', label: '稳定性与可开发性' },
  { key: 'deNovoDesign', label: '从头设计' },
];

function StructurePredictionContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">结构预测</h2>
      <p className="mt-3 text-muted-foreground">从序列到结构，为分子设计建立依据</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">结构预测功能介绍内容待补充。</p>
      </div>
    </div>
  );
}

function MmetricsContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">mmetrics</h2>
      <p className="mt-3 text-muted-foreground">从序列到指标画像，为后续判断标出检查点</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">mmetrics 功能介绍内容待补充。</p>
      </div>
    </div>
  );
}

function AffinityOptimizationContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">亲和力优化</h2>
      <p className="mt-3 text-muted-foreground">优化亲和力，让突变选择有据可依</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">亲和力优化功能介绍内容待补充。</p>
      </div>
    </div>
  );
}

function StabilityDevelopabilityContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">稳定性与可开发性</h2>
      <p className="mt-3 text-muted-foreground">兼顾结合与可开发性，筛选更均衡的候选</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">稳定性与可开发性功能介绍内容待补充。</p>
      </div>
    </div>
  );
}

function DeNovoDesignContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">从头设计</h2>
      <p className="mt-3 text-muted-foreground">围绕同一靶点，探索新的结合分子</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">从头设计功能介绍内容待补充。</p>
      </div>
    </div>
  );
}

function UserCasesContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">用户案例</h2>
      <p className="mt-3 text-muted-foreground">真实客户的研发实践与成果</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <p className="text-muted-foreground">用户案例内容待补充。</p>
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
  const [activeSub, setActiveSub] = useState('structurePrediction');

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
              const isCoreFeatures = item.key === 'coreFeatures';
              const isActive = activeTab === item.key;
              return (
                <div key={item.key}>
                  <button
                    onClick={() => {
                      setActiveTab(item.key);
                      if (isCoreFeatures && !activeSub) {
                        setActiveSub('structurePrediction');
                      }
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2.5 text-sm text-left transition-colors hover:text-white',
                      isActive && 'border-accent bg-white/[0.05] text-white'
                    )}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {item.label}
                  </button>
                  {/* 核心功能子项 */}
                  {isCoreFeatures && isActive && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                      {coreFeatureSubs.map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => setActiveSub(sub.key)}
                          className={cn(
                            'rounded-md px-3 py-2 text-left text-sm transition-colors hover:text-white',
                            activeSub === sub.key ? 'text-white' : 'text-muted-foreground'
                          )}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="mt-8 max-w-[480px]">
            <DocsSearch locale={locale} />
          </div>
        </aside>

        {/* 中间内容区 */}
        <main>
          {activeTab === 'coreFeatures' && activeSub === 'structurePrediction' && <StructurePredictionContent />}
          {activeTab === 'coreFeatures' && activeSub === 'mmetrics' && <MmetricsContent />}
          {activeTab === 'coreFeatures' && activeSub === 'affinityOptimization' && <AffinityOptimizationContent />}
          {activeTab === 'coreFeatures' && activeSub === 'stabilityDevelopability' && <StabilityDevelopabilityContent />}
          {activeTab === 'coreFeatures' && activeSub === 'deNovoDesign' && <DeNovoDesignContent />}
          {activeTab === 'userCases' && <UserCasesContent />}
          {activeTab === 'apiKey' && <ApiKeyContent />}
          {activeTab === 'mcpService' && <McpServiceContent />}
          {activeTab === 'faq' && <FaqContent locale={locale} />}
        </main>
      </div>
    </article>
  );
}
