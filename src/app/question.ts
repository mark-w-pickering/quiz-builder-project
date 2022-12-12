export interface Question {
  number: number;
  question: string;
  multipleChoice: boolean;
  choices?: string[];
  answer: string;
  image?: string;
}
