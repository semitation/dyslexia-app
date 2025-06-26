import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const LoginForm = () => {
  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f1f9ff] to-[#fff9f4] px-4">
      <div className="w-full max-w-sm mx-auto">
        {/* ← 홈으로 돌아가기 */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:underline"
          >
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </Link>
        </div>

        {/* 로고 및 타이틀 */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/logo.png"
            alt="리딩브릿지 로고"
            className="w-12 h-12 mb-2 object-contain"
          />
          <Typography
            variant="h4"
            className="text-lg font-bold text-[#1f1f1f]"
          >
            리딩브릿지
          </Typography>
          <Typography
            variant="p"
            className="text-sm text-gray-500 mt-1"
          >
            다시 만나서 반가워요!
          </Typography>
        </div>

        {/* 로그인 카드 */}
        <Card className="w-full shadow-md rounded-xl border border-gray-100">
          <CardHeader className="text-center space-y-1 pb-2">
            <CardTitle className="text-xl font-bold">로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography
              variant="p"
              className="text-center text-gray-500 text-sm mb-5"
            >
              카카오 계정으로 간편하게 로그인하세요
            </Typography>

            <Button
              onClick={handleKakaoLogin}
              className="w-full h-12 bg-[#FEE500] hover:bg-[#ffeb3b] text-black text-base font-semibold flex items-center justify-center gap-2"
            >
              <img
                src="/kakao-logo.png"
                alt="카카오 로고"
                className="w-5 h-5"
              />
              카카오로 로그인
            </Button>

            <div className="mt-6 text-center text-sm text-gray-500">
              아직 계정이 없으신가요?{" "}
              <Link
                to="/signup"
                className="text-[#0052cc] hover:underline font-medium"
              >
                회원가입하기
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
