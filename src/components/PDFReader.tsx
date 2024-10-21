"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });
const NotePopup = dynamic(() => import("./NotePopup"), { ssr: false });
const ExamGenerator = dynamic(() => import("./ExamGenerator"), { ssr: false });

interface Note {
  text: string;
  pageNumber: number;
  timestamp: string;
}

interface Question {
  text: string;
  answer: string;
}

const PDFReader: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("pdfNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }

    const storedQuestions = localStorage.getItem("examQuestions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        console.error("Please upload a valid PDF file.");
        return;
      }
      setPdfFile(file);
    }
  }, []);

  const handleAddNote = useCallback((text: string, pageNumber: number) => {
    const newNote = { text, pageNumber, timestamp: new Date().toISOString() };
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem("pdfNotes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }, []);

  const handleAddQuestion = useCallback((question: Question) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions, question];
      localStorage.setItem("examQuestions", JSON.stringify(updatedQuestions));
      return updatedQuestions;
    });
  }, []);

  return (
    <Card className="p-6">
      <Input type="file" accept=".pdf" onChange={handleFileUpload} className="mb-4" />
      {pdfFile && (
        <Tabs defaultValue="read" className="w-full">
          <TabsList>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="exam">Exam</TabsTrigger>
          </TabsList>
          <TabsContent value="read">
            <PDFViewer file={pdfFile} onAddNote={handleAddNote} />
          </TabsContent>
          <TabsContent value="notes">
            <NotesView notes={notes} onAddQuestion={handleAddQuestion} />
          </TabsContent>
          <TabsContent value="exam">
            <ExamGenerator questions={questions} />
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
};

const NotesView: React.FC<{ notes: Note[]; onAddQuestion: (question: Question) => void }> = ({
  notes,
  onAddQuestion,
}) => {
  const [newQuestion, setNewQuestion] = useState({ text: "", answer: "" });

  const handleAddQuestion = () => {
    if (newQuestion.text && newQuestion.answer) {
      onAddQuestion(newQuestion);
      setNewQuestion({ text: "", answer: "" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet. Add some while reading!</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              <p>{note.text}</p>
              <small className="text-gray-500">
                Page {note.pageNumber} - {new Date(note.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Add Question</h3>
        <Input
          type="text"
          placeholder="Question"
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Answer"
          value={newQuestion.answer}
          onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </div>
    </div>
  );
};

export default PDFReader;
