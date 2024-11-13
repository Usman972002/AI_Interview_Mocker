"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const HowItWorks = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center px-20 py-24 bg-gray-50 mt-3 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">How it Works?</h2>
      <p className="text-gray-500 mb-12">Give mock interview in just 3 simple steps</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Card 1 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-5xl text-gray-600 mb-4">🌀</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Interview</h3>
          <p className="text-gray-500 text-center">
            Create a Mock Interview by filling the basic details (Job role, Job Description(Tech Stack) and Years of experience).
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-5xl text-gray-600 mb-4">✏️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Interview & Answer</h3>
          <p className="text-gray-500 text-center">
            Start the interview and answer the questions by enabling the mic and submit the final response.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-5xl text-gray-600 mb-4">🔗</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Get your Feedback</h3>
          <p className="text-gray-500 text-center">
            Get your feedback from the AI (Rating, Question, Your Answer & Correct Answer) & improve yourself.
          </p>
        </div>
      </div>

      <button className="mt-12 px-6 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700"
      onClick={()=>router.push('/dashboard')}
      >
        Get Started Today
      </button>
    </div>
  );
};

export default HowItWorks;
