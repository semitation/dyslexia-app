import { createFileRoute } from "@tanstack/react-router";
import { StudentPage } from "@/page/teacher";

export const Route = createFileRoute("/teacher/student")({
  component: RouteComponent,
});


function RouteComponent() {
  return <div>은기 작업 영역
    <StudentPage />
  </div>;
}
