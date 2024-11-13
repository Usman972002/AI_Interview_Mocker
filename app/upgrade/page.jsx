"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const plans = [
  {
    title: "Free",
    price: "0$",
    features: [
      { text: "Create 3 Free Mock Interview", available: true },
      { text: "Unlimited Retake Interview", available: true },
      { text: "Practice Question", available: false },
      { text: "Usman.com Exclusive App Access", available: false },
      { text: "Email Support", available: false },
    ],
  },
  {
    title: "Monthly",
    price: "7.99$",
    features: [
      { text: "Create 3 Free Mock Interview", available: true },
      { text: "Unlimited Retake Interview", available: true },
      { text: "Practice Question", available: true },
      { text: "Usman.com Exclusive App Access", available: true },
      { text: "Email Support", available: true },
    ],
  },
  {
    title: "Yearly",
    price: "79.99$",
    features: [
      { text: "Create Unlimited Mock Interviews", available: true },
      { text: "Unlimited Retake Interview", available: true },
      { text: "Practice Question", available: true },
      { text: "Usman.com Exclusive App Access", available: true },
      { text: "Priority Email Support", available: true },
    ],
  },
];

const Upgrade = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 p-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Upgrade</h1>
      <p className="text-gray-700 text-lg mb-8">
        Upgrade to a premium plan to access unlimited mock interviews
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-80 text-center hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{plan.title}</h2>
            <p className="text-4xl font-bold text-gray-800 mb-2">{plan.price}</p>
            <p className="text-gray-500 mb-6">/ {plan.title === "Yearly" ? "year" : "month"}</p>

            <ul className="space-y-2 text-gray-800 mb-6">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`${
                    feature.available ? "text-green-600" : "text-red-500"
                  } flex items-center justify-center`}
                >
                  {feature.available ? "✓" : "✗"} {feature.text}
                </li>
              ))}
            </ul>

            <button className="px-6 py-3 w-full text-purple-600 border border-purple-600 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-colors"
            onClick={()=>router.push('/dashboard')}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
