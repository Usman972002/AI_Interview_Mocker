"use client";
import { useUser } from "@clerk/nextjs";
import { React, useState, useEffect } from "react";
import axios from "axios";
import InterviewCard from "./InterviewCard";

const InterviewList = () => {
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress);
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
  const [interviewsList, setInterviewsList] = useState([]);

  useEffect(() => {
    if(user?.primaryEmailAddress?.emailAddress){
        getInterviewDetails();
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  function getInterviewDetails() {
    axios
      .get(
        `${BASEURL}/api/interviewsList/${user?.primaryEmailAddress?.emailAddress}`
      )
      .then((res) => {
        console.log(res?.data);
        setInterviewsList(res?.data);
      })
      .catch((err) => {
        console.log("Error While fetching the Interview By Mockid", err);
      });
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewsList && interviewsList.map((item,index)=>(
            <InterviewCard key={index} item={item}/>
        ))}
    </div>
    
    </div>
  );
};

export default InterviewList;
