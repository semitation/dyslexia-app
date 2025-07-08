import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { ProgressBar } from "@/shared/ui/progress-bar";

export default function ContentManagePage() {
  const lessons = [
    {
      id: 1,
      title: "우리 동네 동물들",
      grade: "초등 1-2학년",
      uploadDate: "2024-01-15",
      assigned: 2,
      status: "완료", // '완료', '변환중'
      pageCount: 20,
      progress: 100,
      color: "bg-orange-300",
    },
    {
      id: 2,
      title: "우주 탐험 이야기",
      grade: "초등 3-4학년",
      uploadDate: "2024-01-12",
      assigned: 1,
      status: "변환중",
      pageCount: 0,
      progress: 25,
      color: "bg-blue-700",
    },
    {
      id: 3,
      title: "마법의 숲 모험",
      grade: "초등 1-2학년",
      uploadDate: "2024-01-10",
      assigned: 0,
      status: "완료",
      pageCount: 18,
      progress: 100,
      color: "bg-green-400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h3" className="font-semibold">
            교안 보관함
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            업로드한 교안을 관리하고 학생들에게 할당해보세요
          </Typography>
        </div>
        <Button size="sm">📤 새 교안 업로드</Button>
      </div>

      <input
        type="text"
        placeholder="교안 제목으로 검색..."
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardContent className="p-4 space-y-3">
              {lesson.status === "변환중" ? (
                <div className={`${lesson.color} rounded p-4 text-white text-center`}>
                  <Typography variant="p" className="text-sm">변환 중...</Typography>
                  <ProgressBar progress={lesson.progress} className="h-2 mt-2 bg-white/30" />
                  <Typography variant="p" className="text-xs">{lesson.progress}%</Typography>
                </div>
              ) : (
                <div className={`${lesson.color} rounded p-4 text-white text-center`}>
                  <Typography variant="p" className="text-sm">
                    {lesson.pageCount}페이지
                  </Typography>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Typography variant="p" className="font-medium">
                  {lesson.title}
                </Typography>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    lesson.status === "완료"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {lesson.status === "완료" ? "변환 완료" : "변환 중"}
                </span>
              </div>
              <Typography variant="p" className="text-sm text-muted-foreground">
                {lesson.grade}
              </Typography>

              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>📅 업로드</span>
                  <span>{lesson.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>👥 할당된 학생</span>
                  <span>{lesson.assigned}명</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  👁️ 미리보기
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  👥 할당
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
