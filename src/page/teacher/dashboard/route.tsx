import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">대시보드</h1>
        <p className="text-sm text-muted-foreground mt-1">
          학생들의 학습 현황을 한눈에 확인하세요
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <p className="text-sm">새 교안 업로드</p>
            <Button size="sm">업로드</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <p className="text-sm">학생 초대</p>
            <Button size="sm">링크 복사</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <p className="text-sm">학습 분석</p>
            <Button size="sm">분석</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">최근 활동</h2>
            <p className="text-sm text-muted-foreground mb-4">
              최근 7일간의 학생 활동을 확인해보세요
            </p>
            <div className="space-y-2">
              {[
                { time: "30분 전", content: "독서 목표 달성", tag: "민지" },
                { time: "2시간 전", content: "새 교안 배정: 마법의 숲 모험", tag: "준호" },
                { time: "4시간 전", content: "학습 진도 80% 달성", tag: "민지" },
              ].map((activity) => (
                <div
                  key={`${activity.time}-${activity.content}`}
                  className="flex items-center justify-between p-2 bg-muted rounded"
                >
                  <div className="flex items-center space-x-2">
                    <Badge>{activity.tag}</Badge>
                    <p className="text-sm">{activity.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-2">빠른 작업</h2>
            <Button className="w-full" size="sm">
              + 새 교안 업로드
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              교안 스토어 둘러보기
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              학생 관리
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">학생 현황</h2>
              <Button variant="link" size="sm">전체 보기</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "민지", grade: "초등학교 2학년", book: "우리 동네 동물들", progress: 65, last: "2시간 전" },
                { name: "준호", grade: "초등학교 1학년", book: "마법의 숲 모험", progress: 30, last: "1일 전" },
              ].map((student) => (
                <div key={student.name} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      {student.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.grade} | 현재 도서: {student.book}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-muted-foreground">{student.progress}%</p>
                    <p className="text-xs text-muted-foreground">마지막 활동: {student.last}</p>
                    <Button variant="link" size="sm">칭찬하기</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">최근 교안</h2>
              <Button variant="link" size="sm">전체 보기</Button>
            </div>
            <div className="space-y-3">
              {[
                { title: "우리 동네 동물들", type: "자체 제작", date: "2024-01-15", status: "처리중" },
                { title: "우주 탐험 이야기", type: "스토어 구매", date: "2024-01-10", status: "완료" },
              ].map((lesson) => (
                <div key={lesson.title} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <p className="text-sm font-medium">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.type} | {lesson.date}</p>
                  </div>
                  <Badge>{lesson.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
