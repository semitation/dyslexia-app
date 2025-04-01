import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { useLocation, useRouter } from "@tanstack/react-router";

export function Sidebar() {
  const router = useRouter();
  const location = useLocation({
    select: (location) => location.pathname,
  });

  const isActive = (path: string): boolean => location.includes(path);

  const getNavButtonClass = (isActivePath: boolean): string => {
    const baseClass = "w-full justify-start";
    const activeClass = "bg-blue-50 text-blue-600 hover:bg-blue-100";
    const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-blue-600";

    return `${baseClass} ${isActivePath ? activeClass : inactiveClass}`;
  };

  return (
    <aside className="flex w-64 flex-col justify-between border-r bg-white py-6">
      <div>
        <div className="flex items-center px-6 py-4">
          <div className="mr-2 h-6 w-6 rounded bg-dyslexia-blue" />
          <Typography variant="h3" size="lg" weight="bold" color="primary">
            리딩브릿지
          </Typography>
        </div>

        <nav className="mt-6 flex flex-col space-y-1 px-6">
          <Button
            variant="ghost"
            className={getNavButtonClass(isActive("/teacher/dashboard"))}
            onClick={() => router.navigate({ to: "/teacher/dashboard" })}
          >
            대시보드
          </Button>
          <Button
            variant="ghost"
            className={getNavButtonClass(isActive("/teacher/student"))}
            onClick={() => router.navigate({ to: "/teacher/student" })}
          >
            학생 관리
          </Button>
          <Button
            variant="ghost"
            className={getNavButtonClass(isActive("/teacher/content"))}
          >
            컨텐츠 관리
          </Button>
          <Button
            variant="ghost"
            className={getNavButtonClass(isActive("/teacher/upload"))}
          >
            자료 업로드
          </Button>
        </nav>
      </div>

      <div className="mt-6 border-t px-6 pt-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div>
            <Typography variant="p" weight="semibold" className="text-gray-900">
              김태희 선생님
            </Typography>
            <Typography variant="p" size="sm" className="text-gray-500">
              서울 초등학교
            </Typography>
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-4 w-full justify-center text-gray-600 hover:bg-gray-50"
        >
          로그아웃
        </Button>
      </div>
    </aside>
  );
}
