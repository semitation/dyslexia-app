import { Typography } from "@/shared/ui/typography";
import { Card, CardContent } from "@/shared/ui/card";
import { Cover } from "@/shared/ui/cover";

type Book = {
  id: string;
  title: string;
  author: string;
  cover?: string;
};

type Category = {
  id: string;
  title: string;
  books: Book[];
};


const MOCK_CATEGORIES: Category[] = [
  {
    id: "science",
    title: "과학",
    books: [
      { id: "b1", title: "유체역학", author: "출판사1", cover: "/covers/1.jpg" },
      { id: "b2", title: "전자기학", author: "출판사2", cover: "/covers/2.jpg" },
      { id: "b3", title: "물리학", author: "출판사3", cover: "/covers/3.jpg" },
      { id: "b4", title: "화학", author: "출판사3", cover: "/covers/4.jpg" },
    ],
  },
  {
    id: "korean",
    title: "국어",
    books: [
      { id: "b5", title: "논어", author: "공자", cover: "/covers/5.jpg" },
      { id: "b6", title: "손자병법", author: "손무", cover: "/covers/6.jpg" },
      { id: "b7", title: "해리포터", author: "J.K.롤링", cover: "/covers/harrypotter.jpg" },
    ],
  },
];

export default function LibraryView() {
  return (
    <div className="space-y-10">
      {MOCK_CATEGORIES.map((category) => (
        <section key={category.id} className="space-y-4">
          
          <Typography variant="h3" weight="semibold" size="lg" className="text-gray-800">
            {category.title}
          </Typography>

          <div className="flex space-x-4 overflow-x-auto pb-1">
            {category.books.map((book) => (
              <Card
                key={book.id}
                className="w-36 shrink-0 cursor-pointer hover:shadow-md transition-shadow"
              >
                <Cover
                  src={book.cover}
                  alt={book.title}
                  className="h-52 w-full object-cover rounded-t"
                />
                <CardContent className="p-2">
                  <Typography variant="p" size="sm" weight="medium" className="line-clamp-2">
                    {book.title}
                  </Typography>
                  <Typography variant="p" size="sm" className="text-gray-500">
                    {book.author}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
