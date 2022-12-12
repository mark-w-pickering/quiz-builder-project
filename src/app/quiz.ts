import { Round } from './round';

export interface Quiz {
  name: string;
  rounds?: Round[];
  backgroundColour?: string;
  backgroundImage?: string;
  showAnswers?: string;
}
