import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

type CardProps = {
  icon?: string;
  title: string;
  description: string;
};

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <main className="flex flex-col items-center w-full px-4 pt-12 pb-20">
        <Typography
          variant="h2"
          className="text-center text-[#007AFF] font-bold mb-2 text-3xl md:text-4xl"
        >
          리딩브릿지
        </Typography>
        <Typography
          variant="p"
          className="text-center text-gray-500 mb-6 text-sm md:text-base max-w-xl"
        >
          난독증 학생들을 위한 맞춤형 학습 경험
          <br />
          보호자가 업로드한 PDF 고안물을 AI로 변환하여 모든 학생이 쉽게 배울 수
          있도록 지원합니다
        </Typography>
        <div className="flex gap-2 mb-10">
          <Button variant="outline" size="lg">
            체험해보기
          </Button>
          <Button size="lg">무료로 시작하기</Button>
        </div>

        <div className="w-full max-w-3xl rounded-2xl border overflow-hidden mb-16">
          <img
            src="/images/readingbridge_preview.JPG"
            alt="리딩브릿지 미리보기"
            className="w-full h-auto"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-20">
          <FeatureCard
            icon="🗣️"
            title="TTS 음성 지원"
            description="텍스트를 음성으로 학습"
          />
          <FeatureCard
            icon="🔤"
            title="폰트 조절"
            description="읽기 편한 글씨체로 변경"
          />
          <FeatureCard
            icon="🔍"
            title="어휘 분석"
            description="어려운 단어를 쉽게 설명"
          />
          <FeatureCard
            icon="📖"
            title="책처럼 읽기"
            description="자연스러운 읽기 연습 제공"
          />
        </div>

        <section className="w-full max-w-5xl bg-[#f5faff] rounded-2xl p-8 md:p-12 mb-20">
          <Typography
            variant="h3"
            className="text-center text-[#007AFF] font-semibold mb-4"
          >
            리딩브릿지의 핵심 기능
          </Typography>
          <Typography variant="p" className="text-center text-gray-600 mb-8">
            난독증 학생들을 위한 혁신적인 학습 솔루션을 제공합니다
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CoreFeature
              title="해외 자료의 한국형 재생성"
              description="공개 자료를 한국 난독증 학생에게 맞춰 재생성"
            />
            <CoreFeature
              title="언제 어디서나 원격 지도"
              description="실시간 모니터링으로 원격 학습 지도 가능"
            />
            <CoreFeature
              title="실시간 모니터링 대시보드"
              description="읽기 속도, 이해도, 참여도 실시간 확인"
            />
            <CoreFeature
              title="난독증 맞춤 솔루션"
              description="읽기 속도, 어휘도, 이해도 맞춤 학습 제공"
            />
          </div>
        </section>

        <section className="w-full max-w-5xl mb-20">
          <Typography variant="h3" className="text-center font-semibold mb-8">
            모든 학생은 배울 권리가 있습니다.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ValueCard
              title="AI 맞춤 변환"
              description="PDF를 난독증 친화적인 디지털 교안으로 자동 변환해요"
            />
            <ValueCard
              title="읽기 자신감"
              description="TTS, 폰트 조절 등으로 아이만의 속도로 학습할 수 있어요"
            />
            <ValueCard
              title="AI 학습 친구"
              description="그림을 그리면 AI 친구가 살아 움직이며 반응해요"
            />
            <ValueCard
              title="학습 관리"
              description="보호자에게 상세한 학습 분석 리포트를 제공해요"
            />
          </div>
        </section>

        <section className="w-full bg-[#007AFF] text-white py-12 text-center">
          <Typography
            variant="h3"
            className="font-semibold mb-3 text-white text-center"
          >
            지금 시작해서 아이의 읽기 자신감을 키워보세요
          </Typography>
          <Typography variant="p" className="mb-6 text-white text-center">
            첫 고안 입력부터 AI 분석까지, 모든 기능을 무료로 체험해보세요
          </Typography>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-[#007AFF] hover:bg-gray-100"
          >
            무료 체험 시작하기
          </Button>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: CardProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
      <div className="text-2xl mb-1">{icon}</div>
      <Typography variant="p" className="font-medium mb-0.5">
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-500 text-xs">
        {description}
      </Typography>
    </div>
  );
}

function CoreFeature({ title, description }: Omit<CardProps, "icon">) {
  return (
    <div className="p-4 bg-white rounded-lg border">
      <Typography variant="p" className="font-medium mb-0.5">
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-600 text-sm">
        {description}
      </Typography>
    </div>
  );
}

function ValueCard({ title, description }: Omit<CardProps, "icon">) {
  return (
    <div className="p-4 bg-white rounded-lg border text-center">
      <Typography variant="p" className="font-medium mb-0.5">
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-600 text-sm">
        {description}
      </Typography>
    </div>
  );
}
