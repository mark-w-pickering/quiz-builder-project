import { Question } from './Question';

export interface Round {
  number: number;
  name: string;
  questions?: Question[];
}
