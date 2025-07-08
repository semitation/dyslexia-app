import { Card, CardContent } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { ProgressBar } from "@/shared/ui/progress-bar";
import LibraryView from "./library";

export default function StudentDashboardPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 shadow rounded-xl">
          <CardContent className="p-6 space-y-2">
            <Typography variant="h2" size="xl" weight="bold" className="text-gray-800">
              안녕하세요, 현정님! 👋
            </Typography>
            <Typography variant="p" size="sm" className="text-gray-600">
              오늘도 즐거운 읽기 시간을 가져봐요
            </Typography>
          </CardContent>
        </Card>
        <Card className="shadow rounded-xl flex flex-col justify-center">
          <CardContent className="p-6 space-y-2">
            <Typography variant="h3" size="lg" weight="semibold" className="text-gray-800">
              오늘의 목표
            </Typography>
            <ProgressBar progress={65} />
            <Typography variant="p" size="sm" className="text-gray-600">
              13/20 페이지 완료
            </Typography>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <Typography variant="h2" size="lg" weight="semibold" className="text-gray-800">
          나의 책들
        </Typography>
        <LibraryView />
      </section>

      <section className="space-y-4">
        <Typography variant="h2" size="lg" weight="semibold" className="text-gray-800">
          최근 받은 칭찬 🌟
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "오늘 '우리 동네 동물들' 책을 정말 열심히 읽었어요! 표정이 너무 밝았어요!",
            "어제 책을 끝까지 포기하지 않고 완성해서 정말 대단해요! 스스로 해결하려고 노력한 모습이 좋았어요.",
            "오늘도 꾸준히 읽기 연습을 해서 정말 멋졌어요! 앞으로도 이렇게 노력해보아요!",
          ].map((text) => (
            <Card key={text} className="shadow rounded-xl">
              <CardContent className="p-4">
                <Typography variant="p" size="sm" className="text-gray-700">{text}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="h2" size="lg" weight="semibold" className="text-gray-800">
          이번 주 성취
        </Typography>
        <Typography variant="p" size="sm" className="text-gray-500">
          열심히 노력한 결과를 확인해보세요
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-yellow-50 shadow rounded-xl flex flex-col items-center p-6 space-y-2">
            <Typography variant="p" size="sm" className="text-yellow-600 font-semibold">완료한 페이지</Typography>
            <Typography variant="h3" size="xl" weight="bold" className="text-gray-800">15 페이지</Typography>
          </Card>
          <Card className="bg-green-50 shadow rounded-xl flex flex-col items-center p-6 space-y-2">
            <Typography variant="p" size="sm" className="text-green-600 font-semibold">읽은 시간</Typography>
            <Typography variant="h3" size="xl" weight="bold" className="text-gray-800">2시간 30분</Typography>
          </Card>
          <Card className="bg-blue-50 shadow rounded-xl flex flex-col items-center p-6 space-y-2">
            <Typography variant="p" size="sm" className="text-blue-600 font-semibold">받은 스티커</Typography>
            <Typography variant="h3" size="xl" weight="bold" className="text-gray-800">12개</Typography>
          </Card>
        </div>
      </section>
    </div>
  );
}
