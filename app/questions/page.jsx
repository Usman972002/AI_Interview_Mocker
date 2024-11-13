"use client";

import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

const FAQ = () => {
  const questions = [
    {
      question: "How do I create a new interview?",
      answer: "To create a new interview, click on 'Add New Interview' and fill in the job role, job description (tech stack), and years of experience.",
    },
    {
      question: "What types of questions can I expect?",
      answer: "The questions are designed based on the job role and required tech stack, covering both general and technical aspects of the role.",
    },
    {
      question: "How do I start the interview?",
      answer: "Click 'Start Interview' to begin. Make sure your microphone is enabled for voice response and follow the prompts to answer each question.",
    },
    {
      question: "What if I want to review my answers?",
      answer: "You can review each answer in the feedback section after submitting the interview. Each response will include feedback and suggested improvements.",
    },
    {
      question: "How is feedback generated?",
      answer: "Our AI analyzes your responses and provides feedback on accuracy, relevant improvements, and offers correct answers for comparison.",
    },
    {
      question: "Can I retake the interview?",
      answer: "Yes, you can retake the interview to practice and improve your responses. Each session is recorded independently.",
    },
    {
      question: "How are ratings determined?",
      answer: "Ratings are based on the quality of your answers, including correctness, clarity, and relevance to the question asked.",
    },
    {
      question: "What job roles are supported?",
      answer: "The platform supports a variety of roles, mainly in tech and engineering. You can request additional roles if not listed.",
    },
    {
      question: "How do I share my interview results?",
      answer: "You can download your feedback summary or share it directly from the dashboard with a unique link for each interview.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize data privacy and security. All responses and feedback are stored securely and are only accessible to you.",
    },
  ];

  return (
    <div className="px-72 py-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
      {questions.map((item, index) => (
        <Collapsible key={index} className="mt-5">
          <CollapsibleTrigger className="flex justify-between p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full">
            {item.question}  <ChevronDown className="h-5 w-5"/>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
               {item.answer}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      </div>
    </div>
  );
};

export default FAQ;
