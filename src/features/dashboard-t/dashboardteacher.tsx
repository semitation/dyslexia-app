import { Sidebar } from "./sidebar";
import { TopHeader } from "./top";

interface TeacherDashboardLayoutProps {
    children?: React.ReactNode;
}

export function TeacherDashboardLayout({ children }: TeacherDashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <TopHeader />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
