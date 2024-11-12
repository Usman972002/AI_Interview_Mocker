import Webcam from "react-webcam";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewId,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      SaveUserAnswer();
    }
  }, [userAnswer]);

  const startStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const SaveUserAnswer = async () => {
    setLoading(true);
    console.log(userAnswer);
    console.log(userAnswer.length);
    if (userAnswer?.length < 10) {
      setLoading(false);
      toast("Error while saving your answer, Please record Again");
      return;
    }
    const feedBackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.Question +
      ",User Answer:" +
      userAnswer +
      ", Depending on question and user answer for the given interview question " +
      "please give us rating for answer and feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedBackPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJsonResponse);

    const JsonFeedbackResp = JSON.parse(mockJsonResponse);

    const res = await axios.post(`${BASEURL}/api/addUserAnswer`, {
      mockIdRef: interviewId,
      question: mockInterviewQuestion[activeQuestionIndex]?.Question,
      correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.Answer,
      userAnswer: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });
    console.log(res);
    console.log(res.data);
    if (res.status === 201) {
      toast("User Answer recorded successfully");
      console.log("User Answers Saved Successfully");
      setUserAnswer("");
      setResults([]);
    } else {
      console.log(res?.data?.message);
      console.log("Error while saving");
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center bg-black items-center rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          alt=""
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading == true}
        onClick={() => {
          startStopRecording();
        }}
        variant="outline"
        className="my-10"
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Anwer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
