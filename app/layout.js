import { ClerkProvider } from "@clerk/nextjs"
import Script from "next/script"
import "./globals.css"

export const metadata = {
  title: "TravelBuddy",
  description: "Find travel buddies and split expenses easily",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}