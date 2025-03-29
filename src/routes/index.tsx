import { createFileRoute } from '@tanstack/react-router';
import { BaseLayout } from '@features/layouts';
import { Hero, News } from '@page/landing';

export const Route = createFileRoute('/')({
  component: Landing,
});

function Landing() {
  return (
    <BaseLayout>
      <Hero />
      <News />
    </BaseLayout>
  );
}
