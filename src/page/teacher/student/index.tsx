import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { ProgressBar} from "@/shared/ui/progress-bar";

export default function StudentManagementPage() {
  const students = [
    {
      name: "김민지",
      age: "8세",
      progress: 65,
      score: 85,
      completedLessons: 2,
      lastActivity: "2일 전",
      activeLessons: 3,
      totalTime: "2시간 30분",
    },
    {
      name: "이준호",
      age: "10세",
      progress: 45,
      score: 78,
      completedLessons: 1,
      lastActivity: "1일 전",
      activeLessons: 2,
      totalTime: "1시간 45분",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h3" className="font-semibold">
            학생 관리
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            등록된 학생들의 학습 현황을 관리하고 분석해보세요
          </Typography>
        </div>
        <Button size="sm">+ 학생 초대하기</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((student) => (
          <Card key={student.name}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-orange-200 flex items-center justify-center text-white font-bold text-lg">
                  {student.name[0]}
                </div>
                <div>
                  <Typography variant="p" className="font-semibold">{student.name}</Typography>
                  <Typography variant="p" className="text-sm text-muted-foreground">{student.age}</Typography>
                </div>
              </div>

              <div>
                <Typography variant="p" className="text-sm text-muted-foreground">전체 진행률</Typography>
                <ProgressBar progress={student.progress} className="h-2 mt-1" />
                <Typography variant="p" className="text-right text-xs text-muted-foreground mt-1">
                  {student.progress}%
                </Typography>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-blue-50 rounded p-2 text-center">
                  <Typography variant="p" className="text-xs text-blue-600">평균 점수</Typography>
                  <Typography variant="p" className="font-semibold">{student.score}점</Typography>
                </div>
                <div className="bg-green-50 rounded p-2 text-center">
                  <Typography variant="p" className="text-xs text-green-600">완료 교안</Typography>
                  <Typography variant="p" className="font-semibold">{student.completedLessons}권</Typography>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1 mt-2">
                <div className="flex justify-between">
                  <span>📅 최근 활동</span>
                  <span>{student.lastActivity}</span>
                </div>
                <div className="flex justify-between">
                  <span>📚 학습 교안</span>
                  <span>{student.activeLessons}권</span>
                </div>
                <div className="flex justify-between">
                  <span>⏱️ 총 학습시간</span>
                  <span>{student.totalTime}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2" size="sm">
                👁️ 상세 분석 보기
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
