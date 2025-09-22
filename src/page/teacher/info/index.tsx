import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { Calendar, LogOut, Bell, User } from "lucide-react";
// import NavigationHeader from "@/components/ui/navigation-header";

export default function InfoPage() {
  const [userInfo, setUserInfo] = useState({
    name: "김영희",
    email: "younghee.kim@email.com",
    phone: "010-1234-5678",
    joinDate: "2024-01-01",
    connectedStudents: 2,
  });

  const [notifications, setNotifications] = useState({
    learningProgress: true,
    weeklyReport: true,
    aiInsights: true,
  });

  const handleSavePhone = () => {
    alert("전화번호가 저장되었습니다");
  };

  const handleSaveNotifications = () => {
    alert("알림 설정이 저장되었습니다");
  };

  const handleLogout = () => {
    // navigate({ to: "/login" })
    alert("로그아웃합니다");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-50 via-white to-warm-50">
      <div className="mx-auto w-full max-w-4xl md:max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">내 정보</h2>
          <p className="text-gray-600 mt-2">
            프로필 정보와 설정을 관리해보세요
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <Typography as="h3" variant="h4" className="font-semibold">
                    기본 정보
                  </Typography>
                </div>
                <Typography variant="p" className="text-sm text-gray-600">
                  카카오 로그인으로 연결된 정보입니다
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-700">
                      이름
                    </label>
                    <input
                      id="name"
                      value={userInfo.name}
                      readOnly
                      className="w-full border rounded px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-700">
                      이메일
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      readOnly
                      className="w-full border rounded px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-gray-700">
                    전화번호
                  </label>
                  <input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSavePhone}
                    className="bg-primary hover:bg-primary/90"
                  >
                    전화번호 저장
                  </Button>
                </div> */}
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <Typography as="h3" variant="h4" className="font-semibold">
                    알림 설정
                  </Typography>
                </div>
                <Typography variant="p" className="text-sm text-gray-600">
                  받고 싶은 알림을 설정해보세요
                </Typography>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">학습 진행 알림</h4>
                      <p className="text-sm text-gray-600">
                        학생의 학습 활동을 실시간으로 알려드립니다
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.learningProgress}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          learningProgress: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">주간 리포트</h4>
                      <p className="text-sm text-gray-600">
                        매주 학습 현황 요약을 보내드립니다
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReport}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          weeklyReport: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">AI 분석 인사이트</h4>
                      <p className="text-sm text-gray-600">
                        AI가 분석한 학습 개선 제안을 알려드립니다
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.aiInsights}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          aiInsights: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} variant="outline">
                    알림 설정 저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6 space-y-4">
                <Typography as="h3" variant="h4" className="text-lg">
                  계정 현황
                </Typography>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>가입일</span>
                    </div>
                    <span className="font-medium">{userInfo.joinDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-primary" />
                      <span>연결된 학생</span>
                    </div>
                    <span className="font-medium">
                      {userInfo.connectedStudents}명
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <LogOut className="w-5 h-5" />
                  <Typography as="h3" variant="h4" className="font-semibold">
                    계정
                  </Typography>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
