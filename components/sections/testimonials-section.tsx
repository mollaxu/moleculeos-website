'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/motion/reveal';

const quotes = [
  '被 MoleculeOS 的可视化吸引',
  '基于我们的项目流程，深度认可 MOS 的全流程设计及优化能力',
  '交互非常流畅，非常用户友好',
  '和市面上别的蛋白计算软件相比，MOS 的产品设计非常好。',
];

export function TestimonialsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="home-section-pad py-24">
      <div className="site-container">
        <Reveal className="text-center">
          <p className="eyebrow">用户反馈</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {quotes.map((quote, i) => (
            <motion.blockquote
              key={i}
              className="rounded-2xl border border-border bg-white/[0.02] p-8"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg font-medium leading-relaxed text-white">&ldquo;{quote}&rdquo;</p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
