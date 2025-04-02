import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/ui";

// Example data type
type Person = {
  id: string;
  name: string;
  age: number;
  email: string;
};

// Example data
const data: Person[] = [
  {
    id: "1",
    name: "홍길동",
    age: 25,
    email: "hong@example.com",
  },
  {
    id: "2",
    name: "김철수",
    age: 30,
    email: "kim@example.com",
  },
];

// Column definitions
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "age",
    header: "나이",
  },
  {
    accessorKey: "email",
    header: "이메일",
  },
];

export default function StudentPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
