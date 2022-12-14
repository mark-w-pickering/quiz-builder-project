import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RunQuizComponent } from './run-quiz.component';
import { Slide } from '../slide';


describe('RunQuizComponent', () => {
  let component: RunQuizComponent;
  let fixture: ComponentFixture<RunQuizComponent>;

  beforeEach(async () => {
    let store:any = {
      'quizData': '{"name":"Test Quiz 2","backgroundColour":"#ababab","showAnswers":"end","rounds":[{"number":1,"name":"First Round","questions":[{"number":1,"question":"1st Round First question?","answer":"1st Round First Answer","image":null},{"number":2,"question":"1st Round Second question?","answer":"1st Round Second Answer","image":null}]},{"number":2,"name":"Second Round","questions":[{"number":1,"question":"2nd Round First question?","answer":"2nd Round First answer","image":null},{"number":2,"question":"2nd Round Second question?","answer":"2nd Round Second answer","image":null}]}]}'
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set background colour', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const quizContainer = fixture.debugElement.query(By.css("#quiz-container")).nativeElement;
      expect(quizContainer.style.backgroundColor).toEqual('rgb(171, 171, 171)');
    });
  }));

  it('should order slides', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.slides.length).toBe(13);

      const expectedSlide5:Slide = {
        header: 'Second Round - question 1',
        question: '2nd Round First question?',
        answer: '',
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

  it('should navigate through slides', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      component.changeCurrentSlide(12);
      fixture.detectChanges();
      expect(component.currentSlide).toEqual(component.slides[12]);

      component.changeCurrentSlide(-50);
      fixture.detectChanges();
      expect(component.currentSlide).toEqual(component.slides[0]);

      component.changeCurrentSlide(50);
      fixture.detectChanges();
      expect(component.currentSlide).toEqual(component.slides[12]);

    });
  }));

});
