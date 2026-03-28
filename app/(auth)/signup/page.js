import { SignUp } from "@clerk/nextjs"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <SignUp
        routing="hash"
        signInUrl="/login"
        forceRedirectUrl="/"
      />
    </div>
  )
}