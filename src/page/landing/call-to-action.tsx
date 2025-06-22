import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { useRouter } from "@tanstack/react-router";

export default function CallToAction() {
  const router = useRouter();

  return (
    <section className="py-20 px-4 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Typography
          variant="h2"
          size="xl"
          weight="bold"
          className="mb-4 leading-relaxed"
        >
          지금 시작해서 아이의 읽기 자신감을 키워보세요
        </Typography>
        <Typography
          variant="p"
          size="lg"
          className="opacity-90 mb-8 leading-relaxed"
        >
          첫 교안 업로드부터 AI 분석까지, 모든 기능을 무료로 체험하세요
        </Typography>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4 rounded-lg"
          onClick={() => router.navigate({ to: "/signup/select-role" })}
        >
          무료 체험 시작하기
        </Button>
      </div>
    </section>
  );
}
