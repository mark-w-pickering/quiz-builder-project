import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizFormData: FormGroup;
  quiz:Quiz = { name: '', backgroundColour: '', showAnswers: '', rounds: [] };
  fileToUpload: File | null = null;
  deleteRoundIndex: number;
  deleteQuestionIndex: number;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.quizFormData = this.fb.group({
      name: [null],
      backgroundColour: [null],
      showAnswers: [null],
      rounds: this.fb.array([])
    });

    const localData:any = localStorage.getItem('quizData');

    // Populate from local data
    setTimeout(() => {
      if (localData){
        let localDataObj: any;
        localDataObj = JSON.parse(localData) || {};
        this.quiz.name = localDataObj.name;
        this.quiz.backgroundColour = localDataObj.backgroundColour;
        this.quiz.showAnswers = localDataObj.showAnswers;

        this.quizFormData.controls['name'].setValue(localDataObj.name);
        this.quizFormData.controls['backgroundColour'].setValue(localDataObj.backgroundColour);
        this.quizFormData.controls['showAnswers'].setValue(localDataObj.showAnswers);


        if (localDataObj.rounds) {
          // filter empty rounds
          localDataObj.rounds = localDataObj.rounds.filter((obj: any) => {
            return ((obj.name !== "" && obj.name !== null) || obj.questions.length > 0);
          });

          // reorder rounds by number
          localDataObj.rounds.sort((a:any, b:any) => (a.number - b.number));

          // Add rounds
          for(let i=0; i < localDataObj.rounds.length; i++){
            this.addRound();

            if (localDataObj.rounds[i].questions){
              // filter empty questions
              localDataObj.rounds[i].questions = localDataObj.rounds[i].questions.filter((obj: any) => {
                return ((obj.question !== "" && obj.question !== null) || (obj.answer !== "" && obj.answer !== null));
              });

              // reorder questions by number
              localDataObj.rounds[i].questions.sort((a:any, b:any) => (a.number - b.number));

              // Add questions
              for(let q=0; q < localDataObj.rounds[i].questions.length; q++){
                this.addQuestion(i);
              }
            }
          }
          this.quiz.rounds = localDataObj.rounds;

          // Renumber rounds
          this.quiz.rounds!.forEach((round, roundIndex) => {
            round.number = roundIndex + 1;

            // Renumber questions
            if (round.questions) {
              round.questions.forEach((question, questionIndex) => {
                question.number = questionIndex + 1;
              });
            }

          });
          this.quizFormData.controls['rounds'].setValue(localDataObj.rounds);
        }
      }
    }, 10);

    this.quizFormData.get("name")!.valueChanges.subscribe(selectedValue => {
      setTimeout(() => {
        if (selectedValue) {
          this.quiz.name = selectedValue;
        }
        this.saveToLocal();
      }, 10);
    });

    this.quizFormData.get("backgroundColour")!.valueChanges.subscribe(selectedValue => {
      setTimeout(() => {
        if (selectedValue) {
          this.quiz.backgroundColour = selectedValue;
        }
        this.saveToLocal();
      }, 10);
    });

    this.quizFormData.get("showAnswers")!.valueChanges.subscribe(selectedValue => {
      setTimeout(() => {
        if (selectedValue) {
          this.quiz.showAnswers = selectedValue;
        }
        this.saveToLocal();
      }, 10);
    });

  }

  showDeleteQuizDialog() {
    const deleteQuizDialog = document.getElementById('deleteQuizDialog') as HTMLDialogElement;
    deleteQuizDialog.showModal();
    return false;
  }

  clearQuizData() {
    this.quiz = { name: '', backgroundColour: '', showAnswers: '', rounds: [] };
    this.quizFormData = this.fb.group({
      name: [null],
      backgroundColour: [null],
      showAnswers: [null],
      rounds: this.fb.array([])
    });
    this.saveToLocal();
  }


  rounds(): FormArray {
    return this.quizFormData.get('rounds') as FormArray;
  }

  createRound():FormGroup {
    return this.fb.group({
      number:[null],
      name:[null],
      questions: this.fb.array([])
    });
  }

  addRound() {
    this.rounds().push(this.createRound());
  }

  removeRound() {
    this.rounds().removeAt(this.deleteRoundIndex);
    this.saveToLocal();
  }

  showDeleteRoundDialog(roundIndex:number) {
    this.deleteRoundIndex = roundIndex;
    const deleteRoundDialog = document.getElementById('deleteRoundDialog') as HTMLDialogElement;
    deleteRoundDialog.showModal();
    return false;
  }


  roundQuestions(roundIndex:number) : FormArray {
    return <FormArray> this.rounds().at(roundIndex).get("questions");
  }

  createQuestion():FormGroup {
    return this.fb.group({
      number:[null],
      question:[null],
      answer:[null],
      image:[null]
    })
  }


  addQuestion(roundIndex:number) {
    this.roundQuestions(roundIndex).push(this.createQuestion());
  }

  removeQuestion() {
    this.roundQuestions(this.deleteRoundIndex).removeAt(this.deleteQuestionIndex);
    this.saveToLocal();
  }

  showDeleteQuestionDialog(roundIndex:number, questionIndex:number) {
    this.deleteRoundIndex = roundIndex;
    this.deleteQuestionIndex = questionIndex;
    const deleteQuestionDialog = document.getElementById('deleteQuestionDialog') as HTMLDialogElement;
    deleteQuestionDialog.showModal();
    return false;
  }


  onFileChange(event: any, roundIndex: any, questionIndex: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const uploadedImage = reader.result as string;

        if (uploadedImage) {
          const currentElement = document.querySelector(`#round${roundIndex}imagepicker${questionIndex}`);
          const imageDataElement = <HTMLInputElement>document.querySelector(`#round${roundIndex}image${questionIndex}`);

          if (currentElement) {

            if (imageDataElement){
              imageDataElement.value = uploadedImage;
              this.roundQuestions(roundIndex).value[questionIndex].image = imageDataElement.value;
            }
            setTimeout(() => {
              this.saveToLocal();
            }, 10);
          }
        }
      });

      reader.readAsDataURL(file);
    }
  }


  saveToLocal() {
    this.quiz.rounds = this.quizFormData.value.rounds;

    localStorage.setItem('quizData', JSON.stringify(this.quiz));
  }

}

