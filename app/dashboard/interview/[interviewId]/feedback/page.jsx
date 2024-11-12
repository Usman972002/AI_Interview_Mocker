"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

const feedback = ({ params }) => {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
  const [interviewId, setInterviewId] = useState();
  const [feedbackList, setFeedBackList] = useState([]);
const router = useRouter()

  useEffect(() => {
    // Unwrap `params` with React.use() before accessing properties
    async function fetchParams() {
      const resolvedParams = await params;
      setInterviewId(resolvedParams?.interviewId);
      await getAnswersList(resolvedParams.interviewId);
    }

    fetchParams();
  }, []);

  async function getAnswersList(interviewId) {
    await axios
      .get(`${BASEURL}/api/getAnswers/${interviewId}`)
      .then((res) => {
        console.log(res?.data);
        setFeedBackList(res?.data);
      })
      .catch((err) => {
        console.log("Error While fetching Feedback Details ", err);
      });
  }

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ?
    <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Record Found</h2>  
    :<>
    
          
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl"> Here is your interview feedback</h2>
      {/* <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2> */}

      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer, Your answer and
        feedback for improvement
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-5">
            <CollapsibleTrigger className="flex justify-between p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full">
              {item?.question} <ChevronsUpDown className="h-5 w-5"/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg "><strong>Rating :</strong>{item?.rating}</h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer :</strong>{item?.userAnswer}</h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer :</strong>{item?.correctAnswer}</h2>
              <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary"><strong>Feedback :</strong>{item?.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

</> }
   
        <Button className="mt-2" onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
};

export default feedback;
