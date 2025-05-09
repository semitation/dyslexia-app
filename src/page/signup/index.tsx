import { Button, Typography } from "@/shared/ui";

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <section className="flex flex-col flex-1 items-center">
                <nav className="max-w-[468px]">
                    <Typography variant="h2" weight="bold" size="2xl" color="secondary">
                        카카오로 5초만에 회원가입할 수 있어요!
                    </Typography>
										<div className="flex w-full justify-center py-6">
											<img src="/kakao.svg" alt="kakao icon" className="w-[96px]" />
										</div>
									<div className="flex flex-col space-y-4 mt-4">
										<Button variant="default" size="xl" className="text-lg">교사로 회원가입</Button>
										<Button variant="secondary" size="xl" className="text-lg">학생으로 회원가입</Button>
									</div>
                </nav>

            </section>
        </div>
    );
}
