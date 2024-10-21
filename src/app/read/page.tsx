// src/pages/read.tsx (updated)
import React, { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import PDFViewer from "@/components/PDFViewer";
import ToolBar from "@/components/ToolBar";
import NotePopup from "@/components/NotePopup";
import { usePDFDocument } from "@/hooks/usePDFDocument";

const Read: React.FC = () => {
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pdfDocument = usePDFDocument(pdfFile);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile(e.target?.result as string);
      };
      reader.onerror = () => {
        setError("Error reading the file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleMarkClick = useCallback(() => {
    // Implement marking functionality
    console.log("Mark clicked");
  }, []);

  const handleEraseClick = useCallback(() => {
    // Implement erasing functionality
    console.log("Erase clicked");
  }, []);

  const handleNoteClick = useCallback(() => {
    setShowNotePopup(true);
  }, []);

  const handleNoteSave = useCallback((note: string) => {
    // Save to local storage
    const notes = JSON.parse(localStorage.getItem("pdfNotes") || "[]");
    notes.push({ text: note, timestamp: new Date().toISOString() });
    localStorage.setItem("pdfNotes", JSON.stringify(notes));
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Read PDF</h1>
        <input type="file" accept=".pdf" onChange={handleFileUpload} className="mb-4" />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {pdfFile && pdfDocument && (
          <>
            <ToolBar onMarkClick={handleMarkClick} onEraseClick={handleEraseClick} onNoteClick={handleNoteClick} />
            <PDFViewer file={pdfFile} />
          </>
        )}
        {!pdfDocument && pdfFile && (
          <div className="text-center">
            <p>Loading PDF...</p>
          </div>
        )}
        {showNotePopup && <NotePopup onSave={handleNoteSave} onClose={() => setShowNotePopup(false)} />}
      </div>
    </Layout>
  );
};

export default Read;
