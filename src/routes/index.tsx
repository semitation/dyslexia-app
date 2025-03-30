import { createFileRoute } from '@tanstack/react-router';
import { BaseLayout } from '@features/layouts';
import { Hero, News, Introsection, Contact } from '@page/landing';

export const Route = createFileRoute('/')({
  component: Landing,
});

function Landing() {
  return (
    <BaseLayout>
      <section className="w-full flex flex-col gap-y-32">
        <Hero />
        <News />
        <Introsection />
        <Contact />
      </section>

    </BaseLayout>
  );
}
