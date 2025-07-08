import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/shared/hooks/use-auth";
import { Link, useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { Home, Store, Users, Folder, User } from "lucide-react";

const navItems = [
  { name: "대시보드", href: "/teacher/dashboard", icon: Home },
  { name: "교안 스토어", href: "/teacher/store", icon: Store },
  { name: "학생 관리", href: "/teacher/student", icon: Users },
  { name: "교안 보관함", href: "/teacher/content", icon: Folder },
  { name: "내 정보", href: "/teacher/info", icon: User },
];

export function TopHeader() {
  const { my } = useAuth();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-3">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-labelledby="logoIconTitle"
              >
                <title id="logoIconTitle">로고 아이콘</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </div>
            <Typography variant="h4" className="font-semibold text-gray-800">
              리딩브릿지
            </Typography>
          </div>
          <Typography variant="p" className="text-xs text-gray-500 mt-0.5">
            보호자 대시보드
          </Typography>
        </Link>

        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "flex items-center space-x-1 text-sm font-medium px-3 py-1 rounded transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon
                  size={16}
                  className={clsx(
                    isActive ? "text-blue-500" : "text-gray-400"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Typography variant="p" size="sm" className="text-gray-700">
          {my?.name ?? "로그인 필요"}
        </Typography>
        <Button size="sm" variant="outline">
          {my ? "로그아웃" : "로그인"}
        </Button>
      </div>
    </header>
  );
}
