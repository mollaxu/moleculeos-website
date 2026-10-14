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

const caseStudies = [
  {
    id: '01',
    target: 'GLP-1R',
    molecule: 'Tirzepatide',
    title: 'GLP-1 受体激动剂的多轴突变评估与从头设计',
    subtitle: '以已上市药物为基准，验证 AI 辅助药物设计的全链路能力',
    background: 'GLP-1 受体是治疗 2 型糖尿病和肥胖的核心靶点，替尔泊肽（Tirzepatide）是 GIPR/GLP-1R 双受体激动剂。本案例以 PDB 7RGP（冷冻电镜，3.1 Å）为实验基准，在 MoleculeOS 平台上完成从界面分析、突变打分到从头蛋白设计的完整链路验证。',
    highlights: [
      { label: '实验基准', value: 'PDB 7RGP' },
      { label: '靶点', value: 'GLP-1R' },
      { label: '药物', value: 'Tirzepatide' },
    ],
    steps: [
      {
        title: '界面分析：绘制禁区地图',
        desc: '对肽-受体界面计算埋藏面积与化学相互作用，发现 Tyr1 是 N 端最深锚定残基（176 Å²），Glu3 和 Asp9 构成盐桥网络，Phe6/Phe22 为疏水核心。这些位点被列为"禁区"——任何设计都不能破坏。',
      },
      {
        title: '多轴突变打分：序列轴 vs 结构轴',
        desc: '序列模型扫描 741 个突变，推荐 Y1M（+5.52）和 F22G（+3.78）为最高分；但结构模型（结合亲和力）显示这些突变会破坏锚定网络和疏水核心，ddG 为正值（去稳定）。交叉验证发现：两轴冲突时，以结构轴为准。',
      },
      {
        title: '结构预测验证：MMFold 三轴闭环',
        desc: '对野生型和 Y1M 变体分别做复合物结构预测。野生型 7TM RMSD 1.17 Å、ipTM 0.768；Y1M 变体 RMSD 1.20 Å、ipTM 0.753——三项指标均略降，与结构轴"否决 Y1M"的结论一致，形成三轴证据链闭环。',
      },
      {
        title: '从头蛋白设计：探索新的结合分子',
        desc: '以受体 ECD 沟槽 11 个热点残基为约束，设计 100 残基结合蛋白。预测界面规模（2254 Å²）超过替尔泊肽本身（1735 Å²），但仅命中 1/11 热点——说明单次生成未精准坐进沟槽中央，需多轮迭代优化。',
      },
    ],
    takeaway: '本案例展示了"序列轴初筛 → 结构轴过滤 → 结构预测验证"的三轴工作流。AI 打分是导航，实验是终点；单轴高分可能隐藏风险，多轴交集才是可实验的起点。',
  },
  {
    id: '02',
    target: 'CLDN18.2',
    molecule: 'Zolbetuximab',
    title: '胃癌靶点 CLDN18.2 的抗体预测与亲和力成熟',
    subtitle: '以 2024 年获批药物为案例，验证 AI 在抗体研发中的预测与设计能力',
    background: 'CLDN18.2 是胃癌高表达靶点，zolbetuximab（Vyloy）于 2024 年获 FDA 批准。本案例以 PDB 9V32（cryo-EM，4.1 Å）为实验基准，在 MoleculeOS 平台上完成抗体结构预测、复合物建模和亲和力成熟突变筛选。',
    highlights: [
      { label: '实验基准', value: 'PDB 9V32' },
      { label: '靶点', value: 'CLDN18.2' },
      { label: '药物', value: 'Zolbetuximab' },
    ],
    steps: [
      {
        title: '结构解析：发现变体选择性的原子基础',
        desc: '分析抗体-抗原界面，发现表位核心包含 3 个 CLDN18.1/18.2 变体差异位点（Ala42、Asn45、Glu56）。Asn45 与轻链 CDR1 的双氢键网络是选择性的关键——在 CLDN18.1（Gln45）上无法形成。',
      },
      {
        title: 'AI 抗体预测：Fv 与复合物的高精度重建',
        desc: '仅输入 VH/VL 序列，MMFold 预测 Fv 结构：VH RMSD 0.84 Å、VL RMSD 0.94 Å，pLDDT 均为 95。复合物预测中，AI 自行"长出来"的界面覆盖了实验表位 11 个残基中的 9 个（82%），界面化学数量级一致。',
      },
      {
        title: '亲和力打分：11,267 个突变的全景扫描',
        desc: '对复合物全部单点突变打分，4,809 个被预测为稳定化。发现 Ala42 是"万能热点"——19/19 种替代均被预测增强结合；CDR 出现"界面芳香化"趋势，大芳香侧链填充界面空腔。',
      },
      {
        title: '交叉验证：稳定性模型过滤高风险候选',
        desc: '用结构稳定性模型对亲和力 top 候选逐一检查。VH CDR3 Asn103→Tyr 在亲和力维度排名靠前（−1.57），但稳定性模型显示该突变会破坏氢键枢纽、导致局部坍塌（−4.56），被否决。唯一双向强阳性：VH CDR3 Ser99→Leu（亲和力 −1.21 / 稳定性 +2.51，99% 分位）。',
      },
    ],
    takeaway: '本案例展示了"预测验证设计"的完整抗体研发链路。实验结构是 AI 的试金石；单维度高分是诱惑，多维度交集才是起点。最终仅将 Ser99→Leu 列为首选候选，其余高分项被降级或否决。',
  },
];

function UserCasesContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">用户案例</h2>
      <p className="mt-3 text-muted-foreground">真实研发场景中的 MOS 实践</p>
      <div className="mt-10 flex flex-col gap-12">
        {caseStudies.map((study) => (
          <div key={study.id} className="rounded-2xl border border-border bg-white/[0.02] p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{study.id}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{study.target}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{study.molecule}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{study.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{study.subtitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{study.background}</p>

            <div className="mt-6 flex flex-wrap gap-6">
              {study.highlights.map((h) => (
                <div key={h.label}>
                  <p className="text-xs text-muted-foreground">{h.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-white">{h.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-6">
              {study.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-muted-foreground">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">核心结论</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.takeaway}</p>
            </div>
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
