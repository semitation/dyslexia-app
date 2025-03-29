import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui";

export default function Header() {
  return (
    <header className="w-full min-h-[64px] flex justify-center">
      <section className="max-w-[768px] w-full flex items-center justify-between">
        <Typography variant="h2" weight="bold" size="2xl" color="primary">
          리딩브릿지
          </Typography>

        <nav className="flex gap-2">
          <Button variant="default">로그인</Button>
          <Button variant="outline">회원가입</Button>
        </nav>

      </section>
    </header>
  );
}
