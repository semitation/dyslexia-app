import { createFileRoute } from '@tanstack/react-router';
import { KakaoAuthPage } from "@page/signup/kakao";

export const Route = createFileRoute('/signup/kakao')({
  component: KakaoAuthPage,
});