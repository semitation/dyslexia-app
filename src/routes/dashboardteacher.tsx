import { createFileRoute } from '@tanstack/react-router';
import TeacherDashboard from '@page/dashboard-t/dashboardteacher';

export const Route = createFileRoute('/dashboardteacher')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <TeacherDashboard>
    </TeacherDashboard>
  );
}
