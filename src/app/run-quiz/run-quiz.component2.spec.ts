import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RunQuizComponent } from './run-quiz.component';
import { Slide } from '../slide';


describe('RunQuizComponent - Show answers after each round', () => {
  let component: RunQuizComponent;
  let fixture: ComponentFixture<RunQuizComponent>;

  beforeEach(async () => {
    let store:any = {
      'quizData': '{"name":"Test Quiz 2","backgroundColour":"#ababab","showAnswers":"each","rounds":[{"number":1,"name":"First Round","questions":[{"number":1,"question":"1st Round First question?","answer":"1st Round First Answer","image":null},{"number":2,"question":"1st Round Second question?","answer":"1st Round Second Answer","image":null}]},{"number":2,"name":"Second Round","questions":[{"number":1,"question":"2nd Round First question?","answer":"2nd Round First answer","image":null},{"number":2,"question":"2nd Round Second question?","answer":"2nd Round Second answer","image":null}]}]}'
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

      expect(component.slides.length).toBe(13);

      const expectedSlide5:Slide = {
        header: 'First Round - question 1',
        question: '1st Round First question?',
        answer: '1st Round First Answer',
        image: null
      };
      expect(component.slides[5]).toEqual(expectedSlide5);

      const expectedSlide12:Slide = {
        header: 'Second Round - question 2',
        question: '2nd Round Second question?',
        answer: '2nd Round Second answer',
        image: null
      };
      expect(component.slides[12]).toEqual(expectedSlide12);

    });
  }));

});
