import { SignUp } from "@clerk/nextjs";

export default function signUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <SignUp afterSignUpUrl="/dashboard" signInUrl="/signin" />
    </div>
  );
}
