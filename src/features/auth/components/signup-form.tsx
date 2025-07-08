import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import type { SignUpFormData, UserType } from '@/shared/types/auth';
import { useSignUp } from '@/shared/hooks/useSignUp';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { MessageCircle } from 'lucide-react';
import { SuccessModal } from './success-modal';
import { storage } from '@/shared/utils/storage';

const signUpSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  grade: z.enum([
    'GRADE_1',
    'GRADE_2',
    'GRADE_3',
    'GRADE_4',
    'GRADE_5',
    'GRADE_6',
  ]).optional(),
  organization: z.string().min(1, '소속을 입력해주세요.'),
});

interface SignUpFormProps {
  userType: UserType;
  defaultNickname?: string;
}

export const SignUpForm = ({
  userType,
  defaultNickname = '',
}: SignUpFormProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { mutate: signUp } = useSignUp();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: defaultNickname,
      organization: '',
      grade: undefined,
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    const clientId = storage.getClientId();
    if (!clientId) {
      console.error('clientId가 없습니다.');
      return;
    }

    signUp(
      {
        ...data,
        userType,
        clientId,
        type: userType,
        interestIds: [],
      },
      {
        onSuccess: () => {
          storage.removeClientId();
          setIsSuccessModalOpen(true);
        },
      }
    );
  };

  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
          <div className="text-center mb-4">
            <Typography variant="h4" className="mb-1">
              {userType === 'STUDENT' ? '학생' : '보호자'} 회원가입
            </Typography>
            <Typography className="text-muted-foreground text-sm">
              카카오톡으로 간편하게 인증해요
            </Typography>
          </div>

          <div className="rounded-md bg-yellow-100 p-4 text-center mb-6">
            <MessageCircle className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
            <Typography variant="h5" className="text-yellow-800">
              카카오톡으로 인증할게요!
            </Typography>
            <Typography className="mt-1 text-sm text-muted-foreground">
              카카오톡 앱이 열리면 본인 인증을 진행해주세요.<br />
              인증이 완료되면 다시 이 화면으로 돌아와요.
            </Typography>
          </div>

          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
            onClick={() => setIsVerified(true)}
          >
            카카오톡 열어서 인증하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-md border border-gray-200 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">이름</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="이름을 입력하세요"
                      className="h-12 px-4 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userType === 'STUDENT' && (
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">학년</FormLabel>
                    <Select
                      {...field}
                      className="h-12 px-4 text-sm"
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="">학년을 선택하세요</option>
                      <option value="GRADE_1">1학년</option>
                      <option value="GRADE_2">2학년</option>
                      <option value="GRADE_3">3학년</option>
                      <option value="GRADE_4">4학년</option>
                      <option value="GRADE_5">5학년</option>
                      <option value="GRADE_6">6학년</option>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">소속</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="소속을 입력하세요"
                      className="h-12 px-4 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-md"
            >
              회원가입
            </Button>
          </form>
        </Form>
      </Card>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        userType={userType}
      />
    </>
  );
};
