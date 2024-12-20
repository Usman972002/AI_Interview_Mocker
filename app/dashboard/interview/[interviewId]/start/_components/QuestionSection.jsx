"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    if (mockInterviewQuestion) {
      console.log("Fetched questions:", mockInterviewQuestion);
      console.log(activeQuestionIndex);
    }
  }, [mockInterviewQuestion, activeQuestionIndex]);

  useEffect(() => {
    // Load voices when available
    const handleVoicesChanged = () => {
      setVoicesLoaded(true);
    };

    // Attach event listener for voiceschanged
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    // Clean up listener
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech

      const speech = new SpeechSynthesisUtterance(text);

      // Check if voices are loaded before setting the voice
      if (voicesLoaded) {
        const voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0] || null; // Fallback in case no voices are available
      }

      speech.pitch = 1; // default pitch
      speech.rate = 1; // default rate

      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <div key={index}>
                <h2
                  className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestionIndex === index
                      ? "bg-blue-500 text-white"
                      : "bg-secondary"
                  }`}
                >
                  Question #{index + 1}
                </h2>
              </div>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>

        <Volume2
          className="cursor-pointer"
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-500">
            <Lightbulb />
            <strong>Note :</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            Click on Record Answer when you want to answer the question. At the
            end of the interview, we will give you the feedback along with the
            correct answer for each question and your answers to compare.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
