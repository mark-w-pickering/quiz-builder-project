import { Component, OnInit } from '@angular/core';
import { Slide } from '../slide';

@Component({
  selector: 'app-run-quiz',
  templateUrl: './run-quiz.component.html',
  styleUrls: ['./run-quiz.component.scss']
})
export class RunQuizComponent implements OnInit {
  localDataObj: any = {};
  slides: Slide[] = [];

  currentSlideIndex: number = 0;
  currentSlide: Slide;

  constructor() { }

  ngOnInit(): void {
    const localData:any = localStorage.getItem('quizData');

    setTimeout(() => {
      if (localData){
        this.localDataObj = JSON.parse(localData) || {};

        const quizContainerElement = document.getElementById('quiz-container');

        if (quizContainerElement != null){
          quizContainerElement.style.backgroundColor = this.localDataObj.backgroundColour;
        }

        // create array of slides
        // 1. Start with Quiz Name Intro Screen
        this.slides.push({question: this.localDataObj.name});
        // 2. Loop through rounds
        // 2.a Start with Round Intro screen
        // 2.b Loop through Round questions
        // 2.c Based on user selected options loop through again with answers or move on the the next round

        for(let roundIndex=0; roundIndex < this.localDataObj.rounds.length; roundIndex++){
          const round = this.localDataObj.rounds[roundIndex];
          this.addRound(roundIndex);

          // If showAnswers is set to "after each round" (value = 'each') loop through again.
          if (this.localDataObj.showAnswers === 'each'){
            this.addRound(roundIndex, true);
          }


          // If showAnswers is set to "after every 3 round3" (value = 'after3') add answers for previous 3 rounds
          if (this.localDataObj.showAnswers === 'after3'){
            if ((roundIndex + 1) % 3 === 0){
              this.addRound(roundIndex-2, true);
              this.addRound(roundIndex-1, true);
              this.addRound(roundIndex, true);
            }

            // if quiz ends on a round number that this not divisible by 3 generate answers for the remaining rounds
            if ((roundIndex + 1) ===  this.localDataObj.rounds.length){
              const remainingRounds = (roundIndex + 1) % 3;
              if (remainingRounds === 2){
                this.addRound(roundIndex-1, true);
                this.addRound(roundIndex, true);
              } else if (remainingRounds === 1){
                this.addRound(roundIndex, true);
              }
            }


          }

        }

        // If showAnswers is set to "after all round" (value = 'end') loop through again.
        if (this.localDataObj.showAnswers === 'end'){

          for(let roundIndex=0; roundIndex < this.localDataObj.rounds.length; roundIndex++){
            this.addRound(roundIndex, true);
          }
        }

        this.currentSlide = this.slides[this.currentSlideIndex];

      }

      document?.getElementById("hidden-element")?.focus();
    }, 10);
  }


  addRound(roundIndex: number, withAnswers:Boolean = false) {
    const round = this.localDataObj.rounds[roundIndex];

    // Add Round Intro Screen
    this.slides.push({
      header: this.localDataObj.name,
      question: `Round ${round.number}: ${round.name}`,
      answer: withAnswers ? 'Answers' : ''
    });

    // Loop through questions
    for(let questionIndex=0; questionIndex < round.questions.length; questionIndex++){
      const question = round.questions[questionIndex];
      // Add question (with answer if set to true)
      this.slides.push({
        header: `${round.name} - question ${question.number}`,
        question: question.question,
        answer: withAnswers ? question.answer : '',
        image: question.image
      });
    }
  }


  changeCurrentSlide(value:number) {
    this.currentSlideIndex = this.currentSlideIndex + value;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = 0;
    } else if ((this.currentSlideIndex + 1) > this.slides.length) {
      this.currentSlideIndex = (this.slides.length - 1);
    }
    this.currentSlide = this.slides[this.currentSlideIndex];
  }

  trapFocus() {
    document?.getElementById("hidden-element")?.focus();
  }

  navigateToHome() {
    window.location.href = "/";
  }

}
