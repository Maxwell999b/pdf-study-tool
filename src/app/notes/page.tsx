import React from "react";
import Layout from "@/components/Layout";

const Notes: React.FC = () => {
  // This is a placeholder. In a real application, you would fetch and display saved notes here.
  const notes = [
    { id: 1, text: "This is an important concept", page: 1 },
    { id: 2, text: "Remember this for the exam", page: 3 },
  ];

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="mb-2">
              <p>
                Page {note.page}: {note.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Notes;
