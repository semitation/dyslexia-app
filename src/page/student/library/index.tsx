import { Typography } from "@/shared/ui/typography";
import { Card, CardContent } from "@/shared/ui/card";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Button } from "@/shared/ui/button";

const BOOKS = [
  { id: "b1", title: "우리 동네 동물들", progress: 65, current: 13, total: 20, buttonText: "계속" },
  { id: "b2", title: "우주 탐험 이야기", progress: 30, current: 8, total: 25, buttonText: "계속" },
  { id: "b3", title: "마법의 숲 모험", progress: 0, current: 0, total: 18, buttonText: "시작" },
];

export default function LibraryView() {
  return (
    <div className="space-y-4">
      {BOOKS.map((book) => (
        <Card key={book.id} className="flex items-center p-4 shadow rounded-xl">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-lg font-bold">
            {book.title[0]}
          </div>
          <div className="flex-1 ml-4 space-y-1">
            <Typography variant="p" weight="bold">{book.title}</Typography>
            <ProgressBar progress={book.progress} />
            <Typography variant="p" size="sm" className="text-gray-500">
              {book.current}/{book.total} 페이지
            </Typography>
          </div>
          <Button size="sm" className="ml-4">{book.buttonText}</Button>
        </Card>
      ))}
    </div>
  );
}
