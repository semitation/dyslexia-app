import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";

export default function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <Typography variant="h3" className="font-semibold">
          내 정보
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          프로필 정보와 설정을 관리해보세요
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4 space-y-3">
            <Typography variant="p" className="font-semibold">
              👤 기본 정보
            </Typography>
            <Typography variant="p" className="text-sm text-muted-foreground">
              카카오 로그인으로 연결된 정보입니다
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <label htmlFor="name" className="text-xs text-gray-500">
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  value="김영희"
                  disabled
                  className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs text-gray-500">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value="younghee.kim@email.com"
                  disabled
                  className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="text-xs text-gray-500">
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                value="010-1234-5678"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <Button size="sm" className="mt-2">
              전화번호 저장
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <Typography variant="p" className="font-semibold">
              계정 현황
            </Typography>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>📅 가입일</span>
                <span>2024-01-01</span>
              </div>
              <div className="flex justify-between">
                <span>👥 연결된 학생</span>
                <span>2명</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <Typography variant="p" className="font-semibold">
              ↩ 계정
            </Typography>
            <Button variant="destructive" className="w-full">
              🔓 로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Typography variant="p" className="font-semibold">
              🔔 알림 설정
            </Typography>
            <Typography variant="p" className="text-sm text-muted-foreground">
              받고 싶은 알림을 설정해보세요
            </Typography>
          </div>
          <div className="space-y-2">
            {[
              {
                id: "progress",
                title: "학습 진행 알림",
                desc: "학생의 학습 활동을 실시간으로 알려드립니다",
              },
              {
                id: "weekly",
                title: "주간 리포트",
                desc: "매주 학습 현황 요약을 보내드립니다",
              },
              {
                id: "insight",
                title: "AI 분석 인사이트",
                desc: "AI가 분석한 학습 개선 제안을 알려드립니다",
              },
            ].map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <input
                  id={item.id}
                  type="checkbox"
                  className="mt-1"
                  defaultChecked
                />
                <label htmlFor={item.id} className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </label>
              </div>
            ))}
          </div>
          <Button size="sm">알림 설정 저장</Button>
        </CardContent>
      </Card>
    </div>
  );
}
