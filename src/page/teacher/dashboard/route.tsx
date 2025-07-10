import { useState } from "react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { 
  Card, CardHeader, CardTitle, CardContent 
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { ProgressBar } from "@/shared/ui/progress-bar";
import StudentInviteModal from "./invite-modal";
import {
  Upload,
  UserPlus,
  BarChart3,
  Clock,
  Star,
  BookOpen,
  TrendingUp,
  Plus,
  Store,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const [recentActivities] = useState([
    { id: 1, student: "민지", description: "독서 목표 달성", time: "30분 전", icon: Star },
    { id: 2, student: "준호", description: "새 교안 배정: 마법의 숲 모험", time: "2시간 전", icon: BookOpen },
    { id: 3, student: "민지", description: "학습 진도 80% 달성", time: "4시간 전", icon: TrendingUp },
  ]);

  const [students] = useState([
    { id: 1, name: "민지", grade: "초등학교 2학년", book: "우리 동네 동물들", progress: 65, last: "2시간 전", active: true },
    { id: 2, name: "준호", grade: "초등학교 1학년", book: "마법의 숲 모험", progress: 30, last: "1일 전", active: false },
  ]);

  const [recentLessons] = useState([
    { id: 1, title: "우리 동네 동물들", type: "자체 제작", date: "2024-01-15", completed: false },
    { id: 2, title: "우주 탐험 이야기", type: "스토어 구매", date: "2024-01-10", completed: true },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">학생들의 학습 현황을 한눈에 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link to="/teacher/content" className="block">
            <Card className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md">
              <CardHeader className="px-6 py-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-base font-medium text-gray-900">
                      새 교안 업로드
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF를 업로드하여 AI 변환
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    업로드
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Card
            className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <CardHeader className="px-6 py-4 flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4 flex-1">
                <CardTitle className="text-base font-medium text-gray-900">
                  학생 초대
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  새로운 학생을 초대
                </p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                링크 복사
              </Button>
            </CardHeader>
          </Card>

          <Link to="/teacher/student" className="block">
            <Card className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md">
              <CardHeader className="px-6 py-4">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-base font-medium text-gray-900">
                      학습 분석
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      상세 학습 데이터 확인
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-auto"
                  >
                    분석
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">
                  최근 활동
                </CardTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                최근 7일간의 학습 활동을 확인해보세요
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 space-y-3">
              {recentActivities.map(({ id, student, description, time, icon: Icon }) => (
                <div
                  key={id}
                  className="flex items-center bg-gray-50 rounded-lg px-4 py-3"
                >
                  <div className="p-2 bg-white rounded-lg shadow">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 ml-4 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Badge variant="blue" className="px-2 py-0.5 text-xs">
                        {student}
                      </Badge>
                      <span className="text-xs text-gray-500">{time}</span>
                    </div>
                    <p className="text-sm text-gray-900 mt-1">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                빠른 작업
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 space-y-2">
              <Link to="/teacher/content">
                <Button
                  size="sm"
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2 text-white" />
                  새 교안 업로드
                </Button>
              </Link>
              <Link to="/teacher/store">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Store className="w-4 h-4 mr-2" />
                  교안 스토어 둘러보기
                </Button>
              </Link>
              <Link to="/teacher/student">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  학생 관리
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">
                  학생 현황
                </CardTitle>
              </div>
              <Link to="/teacher/student">
                <Button variant="link" size="sm">
                  전체 보기
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 space-y-4">
              {students.map(({ id, name, grade, book, progress, last, active }) => (
                <div
                  key={id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                      {name[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{name}</h3>
                      <p className="text-xs text-gray-500">{grade}</p>
                      <p className="text-xs text-gray-500">현재 도서: {book}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={clsx(
                          active
                            ? "bg-blue-50 text-blue-600"
                            : "bg-yellow-50 text-yellow-600",
                          "px-2 py-0.5 text-xs"
                        )}
                      >
                        {active ? "활발" : "관심 필요"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        칭찬하기
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ProgressBar
                        progress={progress}
                        className="h-2 w-24"
                      />
                      <span className="text-xs font-medium text-gray-600">{progress}%</span>
                    </div>
                    <p className="text-xs text-gray-500">마지막 활동: {last}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">
                  최근 교안
                </CardTitle>
              </div>
              <Link to="/teacher/content">
                <Button variant="link" size="sm">
                  전체 보기
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 space-y-4">
              {recentLessons.map(({ id, title, type, date, completed }) => (
                <div
                  key={id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs">
                        {type}
                      </Badge>
                      <span className="text-xs text-gray-500">{date}</span>
                    </div>
                  </div>
                  <Badge
                    className={clsx(
                      completed
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-700",
                      "px-2 py-0.5 text-xs"
                    )}
                  >
                    {completed ? "완료" : "처리중"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <StudentInviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
