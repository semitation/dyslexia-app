import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

export default function Header() {
  return (
    <header className="w-full px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* 로고 */}
        <Link to="/">
          <Typography
            as="h1"
            variant="h3"
            weight="bold"
            className="text-primary text-xl sm:text-2xl"
          >
            리딩브릿지
          </Typography>
        </Link>

        {/* 우측 메뉴 */}
        <div className="flex gap-3 items-center">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-gray-700 hover:bg-gray-100 rounded-lg px-6"
            >
              로그인
            </Button>
          </Link>
          <Link to="/signup/select-role">
            <Button
              className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6"
            >
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
