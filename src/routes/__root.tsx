import { queryClient } from '@/shared/lib/tanstack-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
	component: () => (
		<ErrorBoundary fallback={<div>오류 처리</div>}>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<TanStackRouterDevtools />
			</QueryClientProvider>
			<Toaster position="top-center" />
		</ErrorBoundary>
	),
});
