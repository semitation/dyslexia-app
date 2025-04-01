import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/dashboard")({
  component: RouteComponent,
});

/**
 * @author HeyChi
 * @description 여기서 작업 부탁드립니다!
 */
function RouteComponent() {
  return <div>치윤님 파이팅입니다!</div>;
}
