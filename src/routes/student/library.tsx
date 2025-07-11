import  StudentDashboardPage  from '@/page/student';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/student/library')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <StudentDashboardPage />
    </div>
  );
}
