import type { Locale } from '@/lib/site-config';
import { HeroSection } from '@/components/sections/hero-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { TrustSection } from '@/components/sections/trust-section';
import { TasksSection } from '@/components/sections/tasks-section';
import { ModelStackSection } from '@/components/sections/model-stack-section';
import { FlywheelSection } from '@/components/sections/flywheel-section';
import { ValidationSection } from '@/components/sections/validation-section';
import { FinalCTASection } from '@/components/sections/final-cta-section';
import { HomePosition } from '@/components/layout/home-position';
import { availableCapabilityMedia } from '@/lib/capability-media';

// Narrative: product → what it is → what it does → cases → evidence → testimonials → flywheel → act.
export function HomePage({ locale }: { locale: Locale }) {
  const sections = [
    <HeroSection key="hero" locale={locale}/>,
    <ModelStackSection key="models" locale={locale}/>,
    <TasksSection key="tasks" locale={locale} availableMedia={availableCapabilityMedia()}/>,
    <ValidationSection key="validation" locale={locale}/>,
    <TrustSection key="evidence"/>,
    <TestimonialsSection key="testimonials" />,
    <FlywheelSection key="flywheel"/>,
    <FinalCTASection key="cta" locale={locale}/>,
  ];
  return <>{sections.map((section, i) => <div key={i} id={`home-section-${i}`} data-home-section={i}>{section}</div>)}<HomePosition/></>;
}
