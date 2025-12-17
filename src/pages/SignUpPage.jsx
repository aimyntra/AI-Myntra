import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>
            <div className="relative z-10">
                <SignUp />
            </div>
        </div>
    );
}
