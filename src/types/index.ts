export interface Note {
  id: number;
  text: string;
  pageNumber: number;
  x: number;
  y: number;
}

export interface Mark {
  id: number;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}
