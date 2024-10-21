import { useState } from "react";

interface Mark {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

export function useMarker() {
  const [marks, setMarks] = useState<Mark[]>([]);

  const addMark = (mark: Omit<Mark, "id">) => {
    const newMark = { ...mark, id: Date.now().toString() };
    setMarks((prevMarks) => [...prevMarks, newMark]);
  };

  const removeMark = (id: string) => {
    setMarks((prevMarks) => prevMarks.filter((mark) => mark.id !== id));
  };

  return { marks, addMark, removeMark };
}
