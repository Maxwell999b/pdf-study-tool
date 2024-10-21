import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function usePDFDocument(file: File | null) {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!file) {
      setPdfDocument(null);
      setError(null);
      return;
    }

    const loadPDF = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        setPdfDocument(pdf);
        setError(null);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setPdfDocument(null);
        setError(err instanceof Error ? err : new Error("Unknown error occurred while loading PDF"));
      }
    };

    loadPDF();

    return () => {
      if (pdfDocument) {
        pdfDocument.destroy();
      }
    };
  }, [file]);

  return { pdfDocument, error };
}
