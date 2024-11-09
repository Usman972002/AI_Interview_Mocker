"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
  const [interviewData, setInterViewData] = useState();
  const [webcamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    // Unwrap `params` with React.use() before accessing properties
    async function fetchParams() {
      const resolvedParams = await params;
      console.log(resolvedParams.interviewId);
      getInterviewDetails(resolvedParams.interviewId);
    }

    fetchParams();
  }, []);

  function getInterviewDetails(interviewId) {
    axios
      .get(`${BASEURL}/api/interview/${interviewId}`)
      .then((res) => {
        console.log(res?.data);
        setInterViewData(res?.data);
      })
      .catch((err) => {
        console.log("Error While fetching the Interview By Mockid", err);
      });
  }

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Information */}
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData?.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years Of Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 ">
            <h2 className="'flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to Start your AI Generated
              Mock Interview, It Has 5 questions which you can answer and at the
              last you will get the rport on the basis of your answer. NOTE: We
              never record your video, Web cam access can be disabled at any
              time.
            </h2>
          </div>
        </div>

        {/* Camera */}
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border " />
              <Button variant='ghost' className="w-full" onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex mt-5 justify-end items-end">
        <Button>Start Interview</Button>
      </div>
    </div>
  );
};

export default Interview;
