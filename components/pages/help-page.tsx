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
  { key: 'case1', label: '提出目标' },
  { key: 'case2', label: '序列到结构' },
  { key: 'case3', label: '分子概览' },
  { key: 'case4', label: '同源参照' },
  { key: 'case5', label: '位点定位' },
  { key: 'case6', label: '改造方案' },
  { key: 'case7', label: '团队协作' },
];

function Case1Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">提出目标</h2>
      <p className="mt-3 text-muted-foreground">让分析与计算围绕任务展开</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Case 1</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Mocha</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">提出目标，让分析与计算围绕任务展开</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            你希望优化一份抗体，却需要先准备结构、检查界面、评估突变，再整理各步结果。通过 Mocha，可以直接描述研究目标与约束，由它拆解任务、分析需要调用的模型，并在完成后整理候选、评分与推荐依据。你可以查看任务过程，也可以打开原始结果继续检查。
          </p>
          <div className="mt-5 rounded-xl border border-border bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white">示例指令</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              请根据给定序列预测结构，推荐 30 个可能改善抗体亲和力的突变，并避开已经与抗原发生相互作用的位置。
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            提交后，通过 Task 查看运行状态、时长和单项任务详情。任务完成后，先阅读主要发现与候选推荐，再从 Workspace 查找报告、数据表和结构文件。
          </p>
      </div>
    </div>
  );
}

function Case2Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">序列到结构</h2>
      <p className="mt-3 text-muted-foreground">为后续分析建立起点</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Case 2</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">MMFold</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">蛋白管理</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">从序列到结构，为后续分析建立起点</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            已有抗体与靶点序列，却还没有可以用于分析的结构。通过 MMFold，可以从序列发起结构预测，将结果载入 MOS 项目，继续查看分子形态、定位残基，并与其他结构进行比较。已有结构时，也可以直接上传，或通过 PDB ID 加载到项目。
          </p>
          <div className="mt-5 rounded-xl border border-border bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white">输入格式</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              将输入整理为模型要求的 FASTA 格式；涉及多条链时，按手册要求在同一行使用 : 分隔。发起 MMFold 计算后，从任务结果面板将预测结构依次导入项目。
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            选中其中一份结构，点击序列上的残基，三维视图中的对应位置会同步高亮。接下来，就可以围绕同一个对象开展区域与位点分析。
          </p>
      </div>
    </div>
  );
}

function Case3Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">分子概览</h2>
      <p className="mt-3 text-muted-foreground">找到值得关注的研究信息</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Case 3</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">MMetrics</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">围绕同一分子，找到值得关注的研究信息</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            结构已经拿到，接下来需要确认：各条链分别是什么，哪些区域值得关注，还有哪些同源信息可以参考。MMetrics 围绕载入的复合物，组织分子概述、同源参考、功能区域、互作关系与突变评分，让你从整体信息进入具体位置，逐步建立对研究对象的理解。
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="mt-1 text-sm text-white">检查蛋白类型、名称、功能、链组成及判断依据</p>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">Annotations</p>
              <p className="mt-1 text-sm text-white">查看 CDR、轻重链和表位相关标注</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            点击区域名称，结构中的对应区域会高亮；点击单个残基，可以进一步定位。此时先建立分子信息概览，再根据具体问题进入同源搜索、互作检查或突变评估。
          </p>
      </div>
    </div>
  );
}

function Case4Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">同源参照</h2>
      <p className="mt-3 text-muted-foreground">为改造补充依据</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Case 4</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">SeqSim Search</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">找到同源参照，为改造补充依据</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            准备改造一段序列时，你希望知道相关蛋白提供了哪些参考：哪些位置保持一致，哪些位置存在变化，还有哪些结构或功能信息值得进一步查阅。SeqSim Search 支持从序列或项目中的指定链发起搜索，再通过筛选、多序列比对与来源访问，找到适合当前问题的参照。
          </p>
          <div className="mt-5 rounded-xl border border-border bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white">操作路径</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              从底部工具栏打开 SeqSim Search。已经载入结构时，选择 Search by My Protein，指定目标蛋白与链，再点击 Blast；只有序列时，可以使用 Search by Sequence。
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            任务完成后，将结果加载到项目，查看匹配指标并展开命中序列。结果过多时，使用 Filter 缩小范围；勾选多个相关蛋白，点击 Align，检查感兴趣区域在不同序列中的变化。需要核对背景信息时，通过 Reference 回到源数据库。
          </p>
      </div>
    </div>
  );
}

function Case5Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">位点定位</h2>
      <p className="mt-3 text-muted-foreground">从结构差异到具体互作</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Case 5</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Superimpose</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Non-Covalent Bond</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Distance</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Annotation</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">从结构差异到具体互作，定位值得检查的位点</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            参考信息已经找到，接下来需要把注意力落到具体位置：不同结构之间，哪些局部区域存在差异？候选位点周围有哪些残基，又参与了哪些互作？在 MOS 中，可以对齐结构、检查空间邻域与非共价互作，再将重点位置和观察记录保存在项目中。
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex gap-4 rounded-lg border border-border bg-white/[0.03] p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-muted-foreground">1</span>
              <div>
                <p className="text-sm font-medium text-white">先比较，再聚焦</p>
                <p className="mt-1 text-sm text-muted-foreground">已有多份结构时，使用 Superimpose，将其中一份设为 Fixed，其他结构作为 Moving，分别指定对齐链，检查局部区域。选中感兴趣的残基后，使用 5&Aring; 按距离和氨基酸种类筛选周围位置。</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-white/[0.03] p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-muted-foreground">2</span>
              <div>
                <p className="text-sm font-medium text-white">从位置进入互作</p>
                <p className="mt-1 text-sm text-muted-foreground">打开 Non-Covalent Bond，检查选中残基的氢键、&pi;-&pi; 堆积与 &pi;-阳离子作用。需要决定先看哪些位置时，可以参考 Hotspots；该列表按单个位点的互作数量排序。</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-white/[0.03] p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-muted-foreground">3</span>
              <div>
                <p className="text-sm font-medium text-white">保存观察</p>
                <p className="mt-1 text-sm text-muted-foreground">通过 Annotation 保存重点残基，命名并写入观察。例如，分别记录&ldquo;拟保留的位置&rdquo;和&ldquo;需要进一步评估的位置&rdquo;，便于后续重新定位。</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

function Case6Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">改造方案</h2>
      <p className="mt-3 text-muted-foreground">比较每一种改造方案</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Case 6</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Mocha</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Mutation Scoring</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Protein Redesign</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">把分析依据转化为候选，比较每一种改造方案</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            有了结构、同源参照和重点位点，下一步是提出具体的候选替换，并比较它们在不同维度中的表现。MOS 提供序列、结构和进化维度的突变评分，也支持结合亲和力突变评估。围绕研究目标，可以通过 Mocha 获得候选推荐与理由，或指定局部范围开展序列重设计。
          </p>
          <div className="mt-5 rounded-xl border border-border bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white">操作路径</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              在 MMetrics &rarr; Mutation Scoring 中，查看或下载 MutXseq.csv、MutXstruct.csv、MutXevo.csv，核对每条记录的链、具体突变与对应维度的分数。需要评估结合亲和力时，按模型要求明确复合物、待扫描链及伙伴链，再通过 Mocha 创建评分任务，从 Output Data 取回结果。
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            将拟改造范围和研究约束明确提交给 Mocha，检查它给出的候选位置、评分与推荐理由。若需要对指定区域重新设计序列，可以发起 Protein Redesign，在任务详情的 Input Data 中核对设计残基，并从 Output Data 下载生成的 FASTA 序列。
          </p>
      </div>
    </div>
  );
}

function Case7Content() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">团队协作</h2>
      <p className="mt-3 text-muted-foreground">让团队继续研究</p>
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Case 7</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Task</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Workspace</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Annotation</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">项目分享</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">把结果与观察留在项目，让团队继续研究</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            候选方案准备完成后，团队还需要检查位置、讨论依据，并确定下一轮实验。MOS 将相关蛋白、工具与任务组织在项目中；你可以查看或下载结果文件，将关键观察记录在位点上，再邀请成员进入项目继续检查。
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">Task</p>
              <p className="mt-1 text-sm text-white">核对相关计算任务</p>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">Workspace</p>
              <p className="mt-1 text-sm text-white">取回报告、数据表和结构文件</p>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">Annotation</p>
              <p className="mt-1 text-sm text-white">记录关注位点及说明</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            由有权分享项目的成员打开 Share，选择公司内成员，设置 Read／Edit 后邀请加入。后续可以根据工作需要调整成员权限。项目中的位点注释可供有权访问的成员查看，具有相应编辑权限的成员可以继续维护。
          </p>
      </div>
    </div>
  );
}


function CaseStat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-xl border border-border bg-white/[0.03] p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}<span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span></p>
    </div>
  );
}

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-white/[0.03]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



function UserCasesContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">用户案例</h2>
      <p className="mt-3 text-muted-foreground">真实研发场景中的 MOS 实践</p>

      {/* 案例 01 */}
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">01</span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">GLP-1R</span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Tirzepatide</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">GLP-1 受体激动剂的多轴突变评估与从头设计</h3>
        <p className="mt-1 text-sm text-muted-foreground">以已上市药物为基准，验证 AI 辅助药物设计的全链路能力</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          GLP-1 受体是治疗 2 型糖尿病和肥胖的核心靶点，替尔泊肽（Tirzepatide）是 GIPR/GLP-1R 双受体激动剂。
          本案例以 PDB 7RGP（冷冻电镜，3.1 Å）为实验基准，在 MoleculeOS 平台上完成从界面分析、突变打分到从头蛋白设计的完整链路验证。
        </p>

        {/* 关键数据 */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <CaseStat label="实验基准" value="PDB 7RGP" />
          <CaseStat label="分辨率" value="3.1" unit="Å" />
          <CaseStat label="肽段长度" value="39" unit="aa" />
          <CaseStat label="界面埋藏面积" value="1,735" unit="Å²" />
        </div>

        {/* Step 1 */}
        <CaseSection title="界面分析：绘制禁区地图">
          <p className="text-sm leading-relaxed text-muted-foreground">
            对肽-受体界面计算埋藏面积与化学相互作用，识别出三个关键锚点残基，构成&ldquo;禁区地图&rdquo;——任何设计都不能破坏这些相互作用：
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">N 端锚定</p>
              <p className="mt-1 text-sm font-medium text-white">Tyr1 ↔ Gln257</p>
              <p className="mt-1 text-xs text-muted-foreground">氢键 · 2.6 Å · 埋藏 176 Å²</p>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">盐桥网络</p>
              <p className="mt-1 text-sm font-medium text-white">Glu3 ↔ Arg213</p>
              <p className="mt-1 text-xs text-muted-foreground">盐桥 · 3.0–3.5 Å</p>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">疏水核心</p>
              <p className="mt-1 text-sm font-medium text-white">Phe6 / Phe22</p>
              <p className="mt-1 text-xs text-muted-foreground">埋藏 130 / 104 Å²</p>
            </div>
          </div>
        </CaseSection>

        {/* Step 2 */}
        <CaseSection title="多轴突变打分：序列轴 vs 结构轴">
          <p className="text-sm leading-relaxed text-muted-foreground">
            同时运行序列适应度模型与结合亲和力模型，对 741 个突变进行双轴扫描。两轴结果出现显著冲突：
          </p>
          <div className="mt-4">
            <DataTable
              headers={['突变', '序列适应度', '结合 ddG', '结构直觉', '判定']}
              rows={[
                ['Y1M', '+5.52（Top 1）', '+1.57（去稳定）', '破坏 N 端锚定', '❌ 否决'],
                ['F22G', '+3.78（Top 2）', '+0.42（去稳定）', '拆掉疏水核心', '❌ 否决'],
                ['V23W', '−1.32', '−2.52（增强）', '芳香填充空腔', '✅ 首选'],
                ['F22K', '+2.22', '−0.82（增强）', '两轴共识', '✅ 备选'],
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            序列模型将&ldquo;罕见&rdquo;误判为&ldquo;可改进&rdquo;，推荐 Y1M 为全场最高分；但结构模型显示该突变破坏盐桥网络，ddG 为正值（去稳定）。
            交叉验证原则：<span className="text-white">两轴冲突时以结构轴为准</span>。
          </p>
        </CaseSection>

        {/* Step 3 */}
        <CaseSection title="结构预测验证：MMFold 三轴闭环">
          <p className="text-sm leading-relaxed text-muted-foreground">
            对野生型与 Y1M 变体分别提交 MMFold 复合物预测，用实验结构 7RGP 作为基准检验：
          </p>
          <div className="mt-4">
            <DataTable
              headers={['指标', '野生型', 'Y1M 变体', '含义']}
              rows={[
                ['7TM Cα RMSD', '1.17 Å', '1.20 Å', '与冷冻电镜几乎一致'],
                ['ipTM（界面置信度）', '0.768', '0.753', 'Y1M 略降'],
                ['肽段 pLDDT', '0.723', '0.714', '逐残基置信度略降'],
                ['结合模式', 'N 端嵌入口袋', '模式保留', '折叠正确'],
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Y1M 三项指标均略降 → 与结构轴&ldquo;否决 Y1M&rdquo;的结论一致 → <span className="text-white">三轴证据链闭环</span>。
          </p>
        </CaseSection>

        {/* Step 4 */}
        <CaseSection title="从头蛋白设计：探索新的结合分子">
          <p className="text-sm leading-relaxed text-muted-foreground">
            以受体 ECD 沟槽 11 个热点残基为约束，设计 60–100 残基的全新结合蛋白：
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CaseStat label="设计长度" value="100" unit="aa" />
            <CaseStat label="α 螺旋占比" value="~82" unit="%" />
            <CaseStat label="界面埋藏" value="2,254" unit="Å²" />
            <CaseStat label="热点命中" value="1/11" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            界面规模超过替尔泊肽本身（1,735 Å²），但仅命中 1/11 热点——说明单次生成未精准坐进沟槽中央。
            迭代策略：换随机种子 / 收紧热点约束 / 用 MMFold 批量筛选 / 湿实验验证。
          </p>
        </CaseSection>

        {/* 核心结论 */}
        <div className="mt-8 rounded-xl border border-border bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">核心结论</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            本案例展示了&ldquo;序列轴初筛 → 结构轴过滤 → 结构预测验证&rdquo;的三轴工作流。序列模型将&ldquo;罕见&rdquo;误判为&ldquo;可改进&rdquo;，
            单独使用会推出高风险候选；多轴交叉后才能获得可实验的起点。AI 打分是导航，实验是终点。
          </p>
        </div>
      </div>

      {/* 案例 02 */}
      <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">02</span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">CLDN18.2</span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">Zolbetuximab</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">胃癌靶点 CLDN18.2 的抗体预测与亲和力成熟</h3>
        <p className="mt-1 text-sm text-muted-foreground">以 2024 年获批药物为案例，验证 AI 在抗体研发中的预测与设计能力</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          CLDN18.2 是胃癌高表达靶点，zolbetuximab（Vyloy）于 2024 年获 FDA 批准，联合化疗一线治疗 CLDN18.2 阳性晚期胃癌。
          本案例以 PDB 9V32（cryo-EM，4.1 Å）为实验基准，在 MoleculeOS 平台上完成抗体结构预测、复合物建模和亲和力成熟突变筛选。
        </p>

        {/* 关键数据 */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <CaseStat label="实验基准" value="PDB 9V32" />
          <CaseStat label="分辨率" value="4.1" unit="Å" />
          <CaseStat label="表位残基数" value="11" />
          <CaseStat label="突变扫描数" value="11,267" />
        </div>

        {/* Step 1 */}
        <CaseSection title="结构解析：发现变体选择性的原子基础">
          <p className="text-sm leading-relaxed text-muted-foreground">
            分析抗体-抗原界面，发现表位核心包含 3 个 CLDN18.1/18.2 变体差异位点，解释了 zolbetuximab 的变体选择性：
          </p>
          <div className="mt-4">
            <DataTable
              headers={['差异位点', 'CLDN18.2', 'CLDN18.1', '结构作用']}
              rows={[
                ['Ala42', 'Ala', 'Ser', '位于表位中心，侧链小，周围有空腔'],
                ['Asn45', 'Asn', 'Gln', '与轻链 CDR1 Asn31 形成双氢键网络'],
                ['Glu56', 'Glu', 'Gln', '与重链 Asn103 氢键 + Glu62–Lys36 盐桥'],
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Asn45 的双氢键网络在 CLDN18.1（Gln45）上无法形成——<span className="text-white">特异性不是玄学，而是原子层面的接触账</span>。
          </p>
        </CaseSection>

        {/* Step 2 */}
        <CaseSection title="AI 抗体预测：Fv 与复合物的高精度重建">
          <p className="text-sm leading-relaxed text-muted-foreground">
            仅输入 VH/VL 序列（117/113 aa），MMFold 独立完成 Fv 折叠与复合物组装，与实验 cryo-EM 结构直接比对：
          </p>
          <div className="mt-4">
            <DataTable
              headers={['组分', 'RMSD（Cα）', '比对残基数', '置信度']}
              rows={[
                ['VH（重链可变区）', '0.84 Å', '112/117', 'pLDDT 95 / iPTM 0.95'],
                ['VL（轻链可变区）', '0.94 Å', '111/113', 'pLDDT 95 / iPTM 0.95'],
                ['CLDN18.2（抗原）', '1.14 Å', '140/171', '—'],
                ['表位重现', '覆盖 9/11 残基', '（82%）', '界面化学数量级一致'],
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            RMSD &lt; 1 Å 意味着：没有实验结构时，AI 可独立折叠抗体可变区，精度足以支撑后续计算。
            82% 表位重现意味着：复合物预测可用于早期表位作图，对 binder 设计和双抗布局有直接价值。
          </p>
        </CaseSection>

        {/* Step 3 */}
        <CaseSection title="亲和力打分：11,267 个突变的全景扫描">
          <p className="text-sm leading-relaxed text-muted-foreground">
            对复合物全部 11,267 个单点突变打分，4,809 个被预测为稳定化。两个关键发现：
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">万能热点</p>
              <p className="mt-1 text-sm font-medium text-white">Ala42 — 19/19 种替代均增强</p>
              <p className="mt-1 text-xs text-muted-foreground">ΔΔG −0.31 ~ −2.56 kcal/mol，芳香族最强</p>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.03] p-4">
              <p className="text-xs text-muted-foreground">界面芳香化趋势</p>
              <p className="mt-1 text-sm font-medium text-white">Phe102→Trp / Asn103→Tyr</p>
              <p className="mt-1 text-xs text-muted-foreground">大芳香侧链填充 CDR-抗原界面空腔</p>
            </div>
          </div>
        </CaseSection>

        {/* Step 4 */}
        <CaseSection title="交叉验证：稳定性模型过滤高风险候选">
          <p className="text-sm leading-relaxed text-muted-foreground">
            用 Structural Stability 模型对亲和力 top 候选逐一检查，捕获&ldquo;亲和力模型看不到&rdquo;的结构风险：
          </p>
          <div className="mt-4">
            <DataTable
              headers={['突变', '亲和力 ΔΔG', '稳定性分数', '百分位', '裁决']}
              rows={[
                ['VH CDR3 S99→L', '−1.21', '+2.51', '99%', '✅ 唯一双向强阳性'],
                ['VL CDR3 F102→W', '−1.66', '−0.69', '76%', '⚠️ 轻度矛盾'],
                ['抗原 A42→T/L', '−2.05 / −1.97', '−0.37 / −0.45', '66–68%', '⚠️ 轻中度矛盾'],
                ['VH CDR3 N103→Y', '−1.57', '−4.56', '13%', '❌ 强烈矛盾'],
                ['VH CDR3 N103→W', '−1.21', '−4.88', '11%', '❌ 强烈矛盾'],
                ['VL CDR1 N31→W', '−1.28', '−3.20', '32%', '❌ 矛盾'],
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Asn103 是 CDR3 的氢键枢纽（4 个氢键）。亲和力模型看到&ldquo;换 Tyr 可做 π-堆积&rdquo;，稳定性模型看到&ldquo;环失去锚点、局部坍塌&rdquo;。
            单看亲和力会推出高风险工程突变——<span className="text-white">多维度交叉是唯一的过滤机制</span>。
          </p>
        </CaseSection>

        {/* 核心结论 */}
        <div className="mt-8 rounded-xl border border-border bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">核心结论</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            本案例展示了&ldquo;预测 → 验证 → 设计&rdquo;的完整抗体研发链路。11,267 个突变扫描后，
            仅 VH CDR3 Ser99→Leu 被列为唯一双向强阳性候选（亲和力 −1.21 / 稳定性 +2.51，99% 分位），
            其余高分项均被降级或否决。实验结构是 AI 的试金石；单维度高分是诱惑，多维度交集才是起点。
          </p>
        </div>

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
  const [activeSub, setActiveSub] = useState('case1');

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
                      if (!isActive) {
                        setActiveTab(item.key);
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
          {activeTab === 'coreFeatures' && activeSub === 'case1' && <Case1Content />}
          {activeTab === 'coreFeatures' && activeSub === 'case2' && <Case2Content />}
          {activeTab === 'coreFeatures' && activeSub === 'case3' && <Case3Content />}
          {activeTab === 'coreFeatures' && activeSub === 'case4' && <Case4Content />}
          {activeTab === 'coreFeatures' && activeSub === 'case5' && <Case5Content />}
          {activeTab === 'coreFeatures' && activeSub === 'case6' && <Case6Content />}
          {activeTab === 'coreFeatures' && activeSub === 'case7' && <Case7Content />}
          {activeTab === 'userCases' && <UserCasesContent />}
          {activeTab === 'apiKey' && <ApiKeyContent />}
          {activeTab === 'mcpService' && <McpServiceContent />}
          {activeTab === 'faq' && <FaqContent locale={locale} />}
        </main>
      </div>
    </article>
  );
}
