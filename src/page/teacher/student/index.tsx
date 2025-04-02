import { DataTable } from '@/shared/ui';

import type { ColumnDef } from '@tanstack/react-table';

// Example data type
type Person = {
	id: string;
	name: string;
	grade: number;
	reason: string;
	interests: string[];
	progress: number;
};
// Example data
const data: Person[] = [
	{
		id: '1',
		name: '박지원',
		grade: 2,
		reason: '시각적 처리 어려움',
		interests: ['우주', '공룡'],
		progress: 20,
	},
	{
		id: '2',
		name: '최성원',
		grade: 3,
		reason: '시각적 처리 어려움',
		interests: ['우주', '공룡'],
		progress: 50,
	},
	{
		id: '3',
		name: '김민준',
		grade: 4,
		reason: '시각적 처리 어려움',
		interests: ['우주', '공룡'],
		progress: 51,
	},
];

const columns: ColumnDef<Person>[] = [
	{
		accessorKey: 'name',
		header: '이름',
	},
	{
		accessorKey: 'grade',
		header: '학년',
	},
	{
		accessorKey: 'reason',
		header: '난독 유형',
	},
	{
		accessorKey: 'progress',
		header: '진행도',
	},
	{
		accessorKey: 'interests',
		header: '관심사',
	},
	{
		accessorKey: 'progress',
		header: '진행도',
	},
];

export default function StudentPage() {
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
