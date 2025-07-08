import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Smartphone } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const LoginForm = () => {
  const handleKakaoLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#f1f9ff] to-[#fff9f4] px-4 py-12">
      <div className="w-full max-w-sm">

        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:underline"
          >
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0078FF]">
              <Smartphone size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#1f1f1f]">리딩브릿지</h1>
          </div>
          <p className="text-sm text-gray-500">다시 만나서 반가워요!</p>
        </div>

        <Card className="w-full rounded-xl shadow-md border border-gray-200">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg font-bold">로그인</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-6 pb-6">
            <p className="text-sm text-gray-500 text-center">
              카카오 계정으로 간편하게 로그인하세요
            </p>

            <Button
              onClick={handleKakaoLogin}
              className="w-full h-12 bg-[#FEE500] hover:bg-[#FFEB00] text-black text-base font-semibold rounded-md transition-colors"
            >
              <span>카카오로 로그인</span>
            </Button>

            <div className="text-center text-sm text-gray-500">
              아직 계정이 없으신가요?{' '}
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
