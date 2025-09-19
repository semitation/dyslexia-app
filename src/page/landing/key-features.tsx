import { Card } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";

export default function KeyFeatures() {
  const features = [
    {
      title: "콘텐츠 변환 예시",
      icon: "/icons/translate.svg",
      description: "해외 공공 교육 자료를 난독증 학생에 맞춰 쉽게 재구성해요.",
      details:
        "단어 난이도 조절, 문장 구조 단순화, 이미지 자동 생성 기능으로 아이의 읽기 이해를 돕습니다.",
      example: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h6 className="text-sm font-medium text-gray-600 mb-2">
              원문 (영어)
            </h6>
            <p className="text-sm text-gray-800">
              "The quick brown fox jumps over the lazy dog."
            </p>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h6 className="text-sm font-medium text-primary mb-2">
              변환된 내용
            </h6>
            <p className="text-sm text-gray-800 font-dyslexic">
              빠른 <span className="bg-yellow-200 px-1 rounded">갈색</span>{" "}
              여우가 게으른 개 위로 뛰어넘어요.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "실시간 모니터링 대시보드",
      icon: "/icons/dashboard.svg",
      description:
        "학습 상태와 이해도를 실시간으로 확인하고 피드백을 제공할 수 있어요.",
      details: "",
      example: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-green-800">
                민지의 학습 상태
              </span>
              <span className="text-green-600">활발히 학습 중</span>
            </div>
            <div className="mt-2 bg-green-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-yellow-800">
                준호의 학습 상태
              </span>
              <span className="text-yellow-600">도움 필요</span>
            </div>
            <div className="mt-2 bg-yellow-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "개인 맞춤 학습 분석",
      icon: "/icons/analysis.svg",
      description:
        "읽기 선호도, 학습 패턴 등을 기반으로 맞춤형 교육을 제공합니다.",
      details: "",
      example: (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h6 className="text-sm font-medium text-blue-800 mb-2">
              읽기 선호도
            </h6>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                큰 글씨
              </span>
              <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                음성 지원
              </span>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h6 className="text-sm font-medium text-purple-800 mb-2">
              학습 패턴
            </h6>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">
                시각적 학습
              </span>
              <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">
                반복 학습
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full px-4 py-20 bg-[#F8FBFF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            size="2xl"
            weight="bold"
            className="text-gray-900 mb-4"
          >
            리딩브릿지의 핵심 기능
          </Typography>
          <Typography variant="p" className="text-gray-600">
            난독증 학생들을 위한 혁신적인 학습 솔루션을 제공합니다
          </Typography>
        </div>

        <div className="space-y-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-white rounded-xl shadow">
                    <img src={feature.icon} className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-base text-gray-700 mb-2 leading-relaxed">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.details}
                </p>
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
                {feature.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
