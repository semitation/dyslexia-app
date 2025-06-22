import { Card, CardContent, Typography } from "@/shared/ui";
import { newsData } from "./data";

export default function News() {
  return (
    <section className="w-full px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <Typography
          as="h2"
          variant="h2"
          weight="bold"
          className="text-3xl mb-12 leading-8 text-primary"
        >
          모든 학생은 배울 권리가 있습니다.
        </Typography>

        <div className="flex flex-col gap-6">
          {newsData.map((news) => (
            <Card key={news.title} className="border border-gray-200">
              <CardContent className="flex flex-col sm:flex-row justify-between gap-y-4 sm:items-center text-left">
                <div>
                  <Typography
                    as="h3"
                    variant="h3"
                    weight="bold"
                    className="text-lg text-gray-800 mb-1"
                  >
                    {news.title}
                  </Typography>
                  <Typography as="p" variant="p" className="text-sm text-gray-600">
                    {news.description}
                  </Typography>
                </div>
                <Typography
                  variant="p"
                  className="text-sm text-gray-500 min-w-fit"
                >
                  {news.year}년 국내기사
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
