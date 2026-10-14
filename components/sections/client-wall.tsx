'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/motion/reveal';

const clients = [
  { name: '齐鲁制药', logo: '/clients/qilu.png' },
  { name: '石药集团', logo: '/clients/cspc.png' },
  { name: '广药集团', logo: '/clients/guangyao.png' },
  { name: '海军军医大学', logo: '/clients/hjmu.png' },
];

export function ClientWall() {
  const reduce = useReducedMotion();

  return (
    <section className="home-section-pad py-24">
      <div className="site-container">
        <Reveal className="text-center">
          <p className="eyebrow">合作客户</p>
        </Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              className="relative h-10 w-auto opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ opacity: 1 }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
