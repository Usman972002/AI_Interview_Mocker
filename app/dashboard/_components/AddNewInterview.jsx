"use client";
import { React, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import axios from "axios";

const AddNewInterview = () => {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);
    const InputPrompt = `Job Position : ${jobPosition} ,
     Job description : ${jobDescription}, 
     Years of Experience : ${jobExperience}, 
     Depending on this information please give 
     me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT}
    interview questions with answers in 
     Json format, Give Questions and Answers 
     as fields in JSON`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result?.response
      ?.text()
      ?.replace("```json", "")
      ?.replace("```", "");
    console.log(JSON.parse(MockJsonResponse));
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      try {
        const res = await axios.post(
          `${BASEURL}/api/addInterView`,
          {
            mockId: uuidv4(),
            jsonMockResp: MockJsonResponse,
            jobPosition: jobPosition,
            jobDescription: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          }
        );

        if(res.status === 201){
            console.log("Added Mock Interview Details Successfully");
        }else{
            console.log(res?.data?.message)
            console.log("Error while saving");
        }

      } catch (err) {
        console.log("error while saving the Interview Response")
      }

      setOpenDialog(false);
    } else {
      console.log("Error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
              <DialogDescription className="mb-4">
                Add Details about your job position/role, job description, and
                years of experience
              </DialogDescription>
              <div className="mt-7 my-3">
                <label>Job Role/Job Position</label>
                <Input
                  required
                  placeholder="Ex. Full Stack Developer"
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Job Description/Tech Stack (In Short)</label>
                <Textarea
                  required
                  placeholder="Ex. React,Node,Spring Boot, SQL etc"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Years of experience</label>
                <Input
                  required
                  max="50"
                  placeholder="Ex. 2,5"
                  type="number"
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
