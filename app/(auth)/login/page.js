import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <SignIn
        routing="hash"
        signUpUrl="/signup"
        forceRedirectUrl="/"
      />
    </div>
  )
}