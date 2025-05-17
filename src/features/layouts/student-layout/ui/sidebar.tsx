import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { useLocation, useRouter } from '@tanstack/react-router';
import { useAuth } from '@/shared/hooks/use-auth';
import { X, Menu } from 'lucide-react';
import type { ReactNode } from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children?: ReactNode;
}

export function Sidebar({ open, onClose, onOpen }: SidebarProps) {
  const { my, logout } = useAuth();
  const router = useRouter();
  const location = useLocation({ select: (l) => l.pathname });

  /*학생용 목데이터*/
  const grade = '중학교 2학년';
  const lastContent = { subject: '과학', title: '2단원 3강', date: '2025-05-14 20:30' };
  const todayTodos = ['국어 독서 1강 수강', '과학 문제풀이'];
  const subjects = ['국어', '과학', '도덕'];

  const isActive = (path: string) => location.includes(path);
  const navCls = (active: boolean) =>
    [
      'w-full justify-start h-10 text-base',
      active
        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600',
    ].join(' ');

  return (
    <>
      {open && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="사이드바 오버레이 닫기"
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 flex h-screen flex-col justify-between border-r bg-white py-8 transition-all duration-200
          ${open ? 'w-80 md:static md:translate-x-0' : 'w-12 md:w-12'}
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {!open && (
          <button
            className="flex h-12 w-12 items-center justify-center text-gray-600 hover:text-blue-600"
            onClick={onOpen}
            aria-label="사이드바 열기"
            type="button"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {open && (
          <>
            <div className="flex items-center justify-between px-6 py-4 md:justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-dyslexia-blue" />
                <Typography variant="h3" size="lg" weight="bold" color="primary">
                  리딩브릿지
                </Typography>
              </div>
              <button
                className="ml-2 text-gray-500 hover:text-gray-800 md:hidden"
                onClick={onClose}
                aria-label="사이드바 닫기"
                type="button"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 flex flex-1 flex-col gap-6 overflow-y-auto px-8">
              <section>
                <Typography variant="p" size="sm" className="text-gray-500">
                  수강학년
                </Typography>
                <Typography variant="p" weight="semibold">
                  {grade}
                </Typography>
              </section>

              <section>
                <Typography variant="p" size="sm" className="text-gray-500">
                  마지막 수강 컨텐츠
                </Typography>
                <div className="mt-1 text-sm leading-tight">
                  <p className="font-medium">
                    [{lastContent.subject}] {lastContent.title}
                  </p>
                  <p className="text-gray-400">{lastContent.date}</p>
                </div>
              </section>

              <section>
                <Typography variant="p" size="sm" className="text-gray-500">
                  오늘 할일
                </Typography>
                <ul className="list-disc list-inside space-y-0.5 text-sm">
                  {todayTodos.map((todo) => (
                    <li key={todo}>{todo}</li>
                  ))}
                </ul>
              </section>

              <section>
                <Typography variant="p" size="sm" className="text-gray-500">
                  수강 과목
                </Typography>
                <nav className="mt-2 flex flex-col gap-2">
                  {subjects.map((s) => (
                    <Button
                      key={s}
                      variant="ghost"
                      className={navCls(isActive(`/student/library/${s}`))}
                      onClick={() => router.navigate({ to: `/student/library/${s}` })}
                    >
                      {s}
                    </Button>
                  ))}
                </nav>
              </section>
            </div>

            <div className="mt-6 border-t px-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div>
                  <Typography variant="p" weight="semibold">
                    {my?.name} 학생
                  </Typography>
                  <Typography variant="p" size="sm" className="text-gray-500">
                    {grade}
                  </Typography>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full justify-center text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  logout();
                  router.navigate({ to: '/' });
                }}
              >
                로그아웃
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
