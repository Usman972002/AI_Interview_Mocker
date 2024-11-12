"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
  const [interviewData, setInterViewData] = useState();
  const [webcamEnabled, setWebCamEnabled] = useState(false);
  const [interviewId, setInterviewId] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    // Unwrap `params` with React.use() before accessing properties
    async function fetchParams() {
      const resolvedParams = await params;
      setInterviewId(resolvedParams?.interviewId);
      await getInterviewDetails(resolvedParams.interviewId);
    }

    fetchParams();
  }, []);

  async function getInterviewDetails(interviewId) {
    await axios
      .get(`${BASEURL}/api/interview/${interviewId}`)
      .then((res) => {
        setInterViewData(res?.data);
        const jsonMockResp = JSON.parse(res?.data?.jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
      })
      .catch((err) => {
        console.log("Error While fetching the Interview By Mockid", err);
      });
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}

        <QuestionSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />

        {/* Video/Audio Recordings */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewId={interviewId}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
