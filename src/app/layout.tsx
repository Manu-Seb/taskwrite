import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link"; // Import Link for custom navigation
import { ArrowRight } from "lucide-react"; // Importing an icon for consistency

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow - Your Ultimate Task Manager",
  description:
    "Organize your life, boost your productivity with TaskFlow. Simple, powerful, and collaborative task management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Fixed Header/Navigation */}
          <header className="fixed top-0 left-0 w-full z-10 flex justify-between items-center p-4 sm:px-8 bg-indigo-700 dark:bg-gray-900 text-white shadow-md rounded-b-xl">
            {/* Logo/App Name */}
            <Link
              href="/"
              className="text-2xl font-bold text-white dark:text-indigo-400 transition-colors hover:text-indigo-200"
            >
              TaskFlow
            </Link>

            {/* Authentication Buttons */}
            <div className="flex items-center gap-4">
              <nav className="space-x-4">
                <a
                  href="#features"
                  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  Contact
                </a>
              </nav>
              <SignedOut>
                {/* Custom Sign In button linking to /signin page */}
                <Link
                  href="/signin"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-500 text-white gap-2 hover:bg-indigo-600 dark:hover:bg-indigo-700 font-semibold text-sm h-10 px-4 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <ArrowRight size={16} />
                  Sign In
                </Link>
                {/* Sign Up button with custom styling */}
                <Link
                  href="/signup" // Assuming Clerk handles this route or you have a custom signup page
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-indigo-700 gap-2 hover:bg-gray-100 dark:hover:bg-gray-200 font-semibold text-sm h-10 px-4 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </SignedOut>
              <SignedIn>
                {/* User Button from Clerk */}
                <UserButton afterSignOutUrl="/" /> {/* Redirect to home after sign out */}
              </SignedIn>
            </div>
          </header>

          {/* Main content area with padding to avoid overlap with fixed header */}
          <div className="pt-20">
            {" "}
            {/* Adjust this padding based on your header's height */}
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
