"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Question {
  text: string;
  answer: string;
}

interface ExamGeneratorProps {
  questions: Question[];
}

const ExamGenerator: React.FC<ExamGeneratorProps> = ({ questions }) => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  const generateQuestions = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setGeneratedQuestions(shuffled.slice(0, numQuestions));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="numQuestions">Number of questions:</Label>
        <Input
          id="numQuestions"
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          min={1}
          max={questions.length}
        />
      </div>
      <Button onClick={generateQuestions}>Generate Exam</Button>
      {generatedQuestions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-2">Generated Exam:</h3>
          <ol className="list-decimal list-inside space-y-2">
            {generatedQuestions.map((question, index) => (
              <li key={index}>
                <strong>Q: {question.text}</strong>
                <br />
                <span>A: {question.answer}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ExamGenerator;
