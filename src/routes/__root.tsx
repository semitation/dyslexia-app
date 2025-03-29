import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/tanstack-query";
import { RootRoute, Outlet } from "@tanstack/react-router";

export const Route = new RootRoute({
  component: RootLayout,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {children}
    </QueryClientProvider> 
  );
}
