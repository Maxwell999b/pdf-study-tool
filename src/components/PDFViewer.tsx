"use client";

import React, { useState, useCallback } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useMarker } from "@/hooks/useMarker";
import { Button } from "@/components/ui/button";
import ToolBar from "./ToolBar";
import NotePopup from "./NotePopup";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  file: File;
  onAddNote: (note: string, pageNumber: number) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, onAddNote }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { marks, addMark, removeMark } = useMarker();
  const [isMarking, setIsMarking] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleTextSelection = useCallback(
    (e: MouseEvent) => {
      if (!isMarking) return;

      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== "") {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        addMark({
          pageNumber,
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          text: selection.toString(),
        });

        selection.removeAllRanges();
      }
    },
    [isMarking, pageNumber, addMark]
  );

  const handleMarkClick = useCallback(() => {
    setIsMarking(true);
    setIsErasing(false);
  }, []);

  const handleEraseClick = useCallback(() => {
    setIsMarking(false);
    setIsErasing(true);
  }, []);

  const handleNoteClick = useCallback(() => {
    setShowNotePopup(true);
  }, []);

  const handleMarkRemove = useCallback(
    (id: string) => {
      if (isErasing) {
        removeMark(id);
      }
    },
    [isErasing, removeMark]
  );

  const handleAddNote = useCallback(
    (note: string) => {
      onAddNote(note, pageNumber);
      setShowNotePopup(false);
    },
    [onAddNote, pageNumber]
  );

  return (
    <div className="flex flex-col items-center">
      <ToolBar onMarkClick={handleMarkClick} onEraseClick={handleEraseClick} onNoteClick={handleNoteClick} />
      <div className="w-full h-[600px]" onMouseUp={handleTextSelection}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl={URL.createObjectURL(file)}
            plugins={[defaultLayoutPluginInstance]}
            onPageChange={(e) => setPageNumber(e.currentPage)}
          />
        </Worker>
      </div>
      <div className="mt-4">
        {marks
          .filter((mark) => mark.pageNumber === pageNumber)
          .map((mark) => (
            <div
              key={mark.id}
              className={`absolute bg-yellow-300 opacity-50 cursor-pointer ${isErasing ? "hover:bg-red-300" : ""}`}
              style={{
                left: mark.x,
                top: mark.y,
                width: mark.width,
                height: mark.height,
              }}
              onClick={() => handleMarkRemove(mark.id)}
              title={isErasing ? "Click to remove" : mark.text}
            />
          ))}
      </div>
      {showNotePopup && <NotePopup onSave={handleAddNote} onClose={() => setShowNotePopup(false)} />}
    </div>
  );
};

export default PDFViewer;
