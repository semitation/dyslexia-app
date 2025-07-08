import { Card } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { ArrowLeft, BookUser, Smile } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "student" | "teacher") => {
    localStorage.setItem("userType", role);
    navigate({
      to: "/signup/kakao",
      search: { userType: role },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#fffaf4] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:underline mb-6"
        >
          <ArrowLeft size={16} />
          홈으로 돌아가기
        </Link>

        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
            <BookUser className="w-6 h-6 text-white" />
          </div>
          <Typography variant="h4" className="font-bold text-gray-800">
            리딩브릿지
          </Typography>
          <Typography variant="p" className="text-gray-600 text-sm mt-1">
            리딩브릿지와 함께 읽기 자신감을 키워보세요
          </Typography>
        </div>

        <Card className="bg-white p-8 rounded-xl shadow-md border max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Typography variant="h4" className="font-bold mb-1">
              회원가입
            </Typography>
            <Typography variant="p" className="text-gray-600">
              어떤 역할로 리딩브릿지를 시작하시나요?
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleRoleSelect("teacher")}
              className="rounded-lg border hover:shadow-md transition p-6 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <BookUser className="text-blue-500 w-5 h-5" />
                </div>
                <Typography variant="h4" className="font-semibold text-base">
                  보호자
                </Typography>
              </div>
              <Typography variant="p" className="text-sm text-gray-600 mb-2">
                부모님 또는 교사로서 아이의 학습을 관리하고 지원해요
              </Typography>
              <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                <li>PDF 교안 업로드 및 변환</li>
                <li>학습 진도 및 분석 리포트</li>
                <li>아동 초대 및 관리</li>
              </ul>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("student")} 
              className="rounded-lg border hover:shadow-md transition p-6 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Smile className="text-orange-500 w-5 h-5" />
                </div>
                <Typography variant="h4" className="font-semibold text-base">
                  아동(학생)
                </Typography>
              </div>
              <Typography variant="p" className="text-sm text-gray-600 mb-2">
                학습의 주인공으로서 나만의 속도로 즐겁게 공부해요
              </Typography>
              <ul className="list-disc list-inside text-sm text-orange-600 space-y-1">
                <li>맞춤형 인터랙티브 리더</li>
                <li>TTS 및 접근성 도구</li>
                <li>AI 학습 친구와 상호작용</li>
              </ul>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              로그인하기
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
