import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/tanstack-query";
import { RootRoute, Outlet } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

export const Route = new RootRoute({
  component: RootLayout,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>오류 처리</div>}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
