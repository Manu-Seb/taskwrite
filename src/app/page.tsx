import Image from "next/image";
import { CheckCircle, Calendar, Users, Activity, ArrowRight, Book } from "lucide-react"; // Importing icons

export default function Home() {
  return (
    // Adjusted min-h to account for the fixed header (assuming 80px from pt-20 in layout.tsx)
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-[calc(100vh-80px)] p-4 pb-10 sm:p-8 md:p-12 lg:p-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      {/* The main content area will now take the first 'auto' row implicitly */}
      <main className="flex flex-col gap-12 items-center text-center sm:items-center sm:text-center w-full max-w-4xl py-16">
        {/* Hero Section */}
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Organize Your Life,
            <br />
            Boost Your Productivity.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A simple yet powerful task manager designed to help you stay on top of your goals, effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-600 text-white gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-500 font-semibold text-base h-12 px-6 shadow-lg hover:shadow-xl transform hover:scale-105"
              href="/signup" // Replace with your actual sign-up route
              rel="noopener noreferrer"
            >
              <ArrowRight size={20} />
              Get Started - It`s Free
            </a>
            <a
              className="rounded-full border border-solid border-indigo-300 dark:border-indigo-700 transition-colors flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 font-medium text-base h-12 px-6 shadow-md hover:shadow-lg transform hover:scale-105"
              href="#features"
              rel="noopener noreferrer"
            >
              <Book size={20} />
              Learn More
            </a>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <h2 className="col-span-full text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Features that empower you
          </h2>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Intuitive Task Creation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quickly add, organize, and prioritize tasks with a user-friendly interface.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105">
            <Calendar size={48} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Due Dates & Reminders</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Never miss a deadline with customizable due dates and smart reminders.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105">
            <Users size={48} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless Collaboration</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share tasks and projects with your team or family, and work together efficiently.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105">
            <Activity size={48} className="text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your progress and celebrate achievements as you complete tasks.
            </p>
          </div>
        </section>
      </main>

      {/* Footer will implicitly take the last 'auto' row */}
      <footer className="w-full max-w-6xl flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center py-8 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            className="hover:underline hover:underline-offset-4 transition-colors"
            href="/privacy-policy" // Replace with your actual Privacy Policy route
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            className="hover:underline hover:underline-offset-4 transition-colors"
            href="/terms-of-service" // Replace with your actual Terms of Service route
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <a
            className="hover:underline hover:underline-offset-4 transition-colors"
            href="/support" // Replace with your actual Support route
            rel="noopener noreferrer"
          >
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}
