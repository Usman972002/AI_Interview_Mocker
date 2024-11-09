"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
    const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
    const [interviewData, setInterViewData] = useState();
    const [webcamEnabled, setWebCamEnabled] = useState(false);
    const [interviewId,setInterviewId] = useState();
   const [mockInterviewQuestion,setMockInterviewQuestion] = useState();
const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);
    useEffect(() => {
        // Unwrap `params` with React.use() before accessing properties
        async function fetchParams() {
          const resolvedParams = await params;
          setInterviewId(resolvedParams?.interviewId)
          getInterviewDetails(resolvedParams.interviewId);
        }
    
        fetchParams();
      }, []);

      function getInterviewDetails(interviewId) {
        axios
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
            mockInterviewQuestion={mockInterviewQuestion} />

            {/* Video/Audio Recordings */}
            <RecordAnswerSection/>

        </div>
    </div>
  )
}

export default StartInterview