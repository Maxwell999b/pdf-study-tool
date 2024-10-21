"use client";

import React, { useState, useEffect } from "react";
import ExamGenerator from "./ExamGenerator";

const ExamClient: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  useEffect(() => {
    const storedPdfFile = localStorage.getItem("currentPdfFile");
    setPdfFile(storedPdfFile);
  }, []);

  if (!pdfFile) {
    return <p>Please upload a PDF file in the PDF Reader section before generating an exam.</p>;
  }

  return <ExamGenerator pdfFile={pdfFile} />;
};

export default ExamClient;
