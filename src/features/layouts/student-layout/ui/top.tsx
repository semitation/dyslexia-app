import { useState, type KeyboardEvent } from "react";
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

  const handleKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") navigate({ to: "/student/library" });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="mr-4 flex h-8 w-8 items-center justify-center text-gray-600 md:hidden"
        aria-label="사이드바 토글"
      >
        <Menu className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => navigate({ to: "/student/library" })}
        className="flex items-center gap-2 focus:outline-none"
      >
        <Typography variant="h4" className="text-2xl text-primary font-bold">
          리딩브릿지
        </Typography>
        <Typography variant="p" size="sm" className="text-gray-500">
          나의 책장
        </Typography>
      </button>

      <div className="flex items-center gap-4 relative">
        <Button
          type="button"
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          AI 친구
        </Button>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 text-gray-700"
        >
          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-semibold text-white">
            {my?.name?.charAt(0) ?? "유"}
          </div>
          <Typography variant="p" size="sm" className="text-gray-800">
            {my?.name ?? "유저"}
          </Typography>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>

        {menuOpen && (
          <ul className="absolute right-0 top-16 mt-2 w-44 overflow-hidden rounded-lg border bg-white text-sm shadow-lg z-50">
            <li>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  navigate({ to: "/student/library" });
                  setMenuOpen(false);
                }}
              >
                회원정보 수정
              </button>
            </li>
            <li>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
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
