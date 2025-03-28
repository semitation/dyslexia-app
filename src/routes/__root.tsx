import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/tanstack-query";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider> 
  );
}
