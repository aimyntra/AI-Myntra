import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[120px]"></div>
            </div>
            <div className="relative z-10">
                <SignIn />
            </div>
        </div>
    );
}
