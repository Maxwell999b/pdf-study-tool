import React from "react";
import dynamic from "next/dynamic";

const ExamClient = dynamic(() => import("@/components/ExamClient"), { ssr: false });

export default function ExamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exam</h1>
      <ExamClient />
    </div>
  );
}
