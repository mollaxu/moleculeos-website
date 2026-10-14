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

const capabilityItems = [
  {
    num: '01',
    title: '结构预测',
    subtitle: '已有序列，先建立可检查的结构假设',
    desc: '输入 VEGF-A 与抗体序列，预测抗体结构及其与靶点的可能结合方式。结合局部与界面置信信息，查看潜在接触区域和需要重点检查的位置，为后续位点分析与候选设计建立结构依据。',
  },
  {
    num: '02',
    title: 'mmetrics',
    subtitle: '已有序列，先建立可检查的性质画像',
    desc: '输入抗体/蛋白序列，mmetrics 计算疏水性、电荷、聚集倾向、翻译后修饰等指标，并展开整体概览与位点级提示。结果用于建立序列层面的性质画像，定位值得进一步查看的位置，为后续结构分析、突变设计和多指标比较提供共同输入。',
  },
  {
    num: '03',
    title: '亲和力优化',
    subtitle: '已有结合分子，哪些突变值得优先验证？',
    desc: '从已有的抗 VEGF-A 抗体出发，结合结构分析与突变效应评估，在指定的改造范围内探索优化方案。获得带位点编号、候选替换、评分和推荐依据的突变清单，帮助确定下一轮实验的优先级。',
  },
  {
    num: '04',
    title: '稳定性与可开发性',
    subtitle: '在结合目标之外，也把开发风险纳入选择。',
    desc: '将稳定性与聚集倾向等可开发性指标纳入抗体优化，比较起始分子与改造候选的预测表现。识别潜在风险，查看结合能力与其他性质之间的取舍，为候选筛选和后续实验提供依据。',
  },
  {
    num: '05',
    title: '从头设计',
    subtitle: '无需以已有抗体为起点，探索新的候选。',
    desc: '以 VEGF-A 结构、目标结合区域和设计约束为起点，生成新的结合蛋白候选，并通过结构预测与界面评估进行筛选。获得候选序列、预测复合物和筛选记录，为先导发现提供可进入实验验证的设计方案。',
  },
];

function CoreFeaturesContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">核心功能</h2>
      <p className="mt-3 text-muted-foreground">围绕一个靶点，从理解分子到设计候选</p>
      <div className="mt-10 flex flex-col gap-10">
        {capabilityItems.map((item) => (
          <div key={item.num} className="rounded-2xl border border-border bg-white/[0.02] p-8">
            <span className="eyebrow">{item.num}</span>
            <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.subtitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
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
