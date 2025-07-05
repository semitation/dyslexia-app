import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/shared/hooks/use-auth";
import { Menu, ChevronDown } from "lucide-react";

interface TopHeaderProps {
  onToggleSidebar: () => void;
}

export function TopHeader({ onToggleSidebar }: TopHeaderProps) {
  const navigate = useNavigate();
  const { my, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <button
        className="mr-2 flex h-8 w-8 items-center justify-center text-gray-600 md:hidden"
        onClick={onToggleSidebar}
        type="button"
        aria-label="사이드바 토글"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => navigate({ to: "/student/library" })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate({ to: "/student/library" });
          }
        }}
        tabIndex={0}
        role="button"
      >
        <Typography variant="p" weight="bold" className="text-lg text-primary">
          리딩브릿지
        </Typography>
        <Typography variant="p" size="sm" className="text-gray-500">
          나의 책장
        </Typography>
      </div>

      <div className="flex items-center gap-2 relative">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            navigate({ to: "/student/library" }); // 경로를 등록 전 임시로 /student/library 로 연결
          }}
          type="button"
        >
          AI 친구
        </Button>

        <button
          className="flex items-center gap-1 text-gray-700"
          onClick={() => setMenuOpen((p) => !p)}
          type="button"
        >
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            {my?.name?.charAt(0) ?? "유"}
          </div>
          <Typography variant="p" size="sm">
            {my?.name ?? "유저"}
          </Typography>
          <ChevronDown className="h-4 w-4" />
        </button>

        {menuOpen && (
          <ul className="absolute right-0 top-12 mt-2 w-40 overflow-hidden rounded-lg border bg-white text-sm shadow-lg z-50">
            <li>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  navigate({ to: "/student/library" }); // 경로 등록 전 임시로 /student/library 로 연결
                  setMenuOpen(false);
                }}
                type="button"
              >
                회원정보 수정
              </button>
            </li>
            <li>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                type="button"
              >
                로그아웃
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
