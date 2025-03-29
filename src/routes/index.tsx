import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Landing,
});

function Landing() {
  return (
    <div>Landing</div>
  );
}
