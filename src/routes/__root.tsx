import { queryClient } from '@/shared/lib/tanstack-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

const ErrorFallback = ({ error }: { error: Error }) => {
	console.error('애플리케이션 오류:', error);
	return (
		<QueryClientProvider client={queryClient}>
			<Outlet />
			<TanStackRouterDevtools />
		</QueryClientProvider>
	);
};

export const Route = createRootRoute({
	component: () => (
		<ErrorBoundary fallbackRender={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<TanStackRouterDevtools />
			</QueryClientProvider>
			<Toaster position="top-center" />
		</ErrorBoundary>
	),
});
