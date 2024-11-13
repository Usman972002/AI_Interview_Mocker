import { Button } from "@/components/ui/button";
import Image from "next/image";
import DashboardLayout from "./dashboard/layout";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardLayout />
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Your Personal AI Interview Mocker
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Double your chances of landing that job offer with our AI-powered
              interview prep!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/howitworks"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
