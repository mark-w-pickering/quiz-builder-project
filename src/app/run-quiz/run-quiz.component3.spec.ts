import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RunQuizComponent } from './run-quiz.component';
import { Slide } from '../slide';


describe('RunQuizComponent - Show answers after every 3 rounds', () => {
  let component: RunQuizComponent;
  let fixture: ComponentFixture<RunQuizComponent>;
  const testData = {
    "name":"Test Quiz 2",
    "backgroundColour":"#ababab",
    "showAnswers":"after3",
    "rounds":[
      {
        "number":1,
        "name":"First Round",
        "questions":[
          {
            "number":1,
            "question":"1st Round First question?",
            "answer":"1st Round First answer",
            "image":null
          }
        ]
      },
      {
        "number":2,
        "name":"Second Round",
        "questions":[
          {
            "number":1,
            "question":"2nd Round First question?",
            "answer":"2nd Round First answer",
            "image":null
          }
        ]
      },
      {
        "number":3,
        "name":"Third Round",
        "questions":[
          {
            "number":1,
            "question":"3rd Round First question?",
            "answer":"3rd Round First answer",
            "image":null
          }
        ]
      },
      {
        "number":4,
        "name":"Forth Round",
        "questions":[
          {
            "number":1,
            "question":"4th Round First question?",
            "answer":"4th Round First answer",
            "image":null
          }
        ]
      },
      {
        "number":5,
        "name":"Fifth Round",
        "questions":[
          {
            "number":1,
            "question":"5th Round First question?",
            "answer":"5th Round First answer",
            "image":null
          }
        ]
      }
    ]
  }
  const testDataString = JSON.stringify(testData);

  beforeEach(async () => {
    let store:any = {
      'quizData': testDataString
    };

    const mockLocalStorage = {
      getItem: (key: any): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);


    await TestBed.configureTestingModule({
      declarations: [ RunQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should order slides', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.slides.length).toBe(21);

      const expectedSlide6:Slide = {
        header: 'Third Round - question 1',
        question: '3rd Round First question?',
        answer: '',
        image: null
      };
      expect(component.slides[6]).toEqual(expectedSlide6);

      const expectedSlide12:Slide = {
        header: 'Third Round - question 1',
        question: '3rd Round First question?',
        answer: '3rd Round First answer',
        image: null
      };
      expect(component.slides[12]).toEqual(expectedSlide12);

    });
  }));

});
