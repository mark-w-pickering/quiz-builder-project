import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {

    let store:any = {
      'quizData': '{"name":"Test Quiz 2","backgroundColour":"#ababab","showAnswers":"after3","rounds":[{"number":5,"name":"Second Round","questions":[{"number":4,"question":"2nd Round Second question?","answer":"2nd Round Second answer","image":null},{"number":2,"question":"2nd Round First question?","answer":"2nd Round First answer","image":null},{"number":9,"question":"","answer":"2nd Round Third answer","image":null}]},{"number":3,"name":"First Round","questions":[{"number":3,"question":"1st Round First question?","answer":"1st Round First Answer","image":null},{"number":5,"question":"1st Round Second question?","answer":"1st Round Second Answer","image":null}]},{"number":9,"name":"","questions":[{"number":1,"question":"3rd Round First question?","answer":"","image":null}]}]}'
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
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ QuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sort rounds and questions', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const quizNameField = <HTMLInputElement>fixture.debugElement.query(By.css("#name")).nativeElement;
      expect(quizNameField.value).toEqual('Test Quiz 2');


      const firstRoundNameField = <HTMLInputElement>fixture.debugElement.query(By.css("#name0")).nativeElement;
      expect(firstRoundNameField.value).toEqual('First Round');

      const firstRoundNumberField = <HTMLInputElement>fixture.debugElement.query(By.css("#number0")).nativeElement;
      expect(firstRoundNumberField.value).toEqual('1');

      const firstRoundQ1QuestionField = <HTMLInputElement>fixture.debugElement.query(By.css("#round0question0")).nativeElement;
      expect(firstRoundQ1QuestionField.value).toEqual('1st Round First question?');

      const firstRoundQ1NumberField = <HTMLInputElement>fixture.debugElement.query(By.css("#round0number0")).nativeElement;
      expect(firstRoundQ1NumberField.value).toEqual('1');

      const firstRoundQ2QuestionField = <HTMLInputElement>fixture.debugElement.query(By.css("#round0question1")).nativeElement;
      expect(firstRoundQ2QuestionField.value).toEqual('1st Round Second question?');

      const firstRoundQ2NumberField = <HTMLInputElement>fixture.debugElement.query(By.css("#round0number1")).nativeElement;
      expect(firstRoundQ2NumberField.value).toEqual('2');


      const secondRoundNameField = <HTMLInputElement>fixture.debugElement.query(By.css("#name1")).nativeElement;
      expect(secondRoundNameField.value).toEqual('Second Round');

      const secondRoundNumberField = <HTMLInputElement>fixture.debugElement.query(By.css("#number1")).nativeElement;
      expect(secondRoundNumberField.value).toEqual('2');

      const secondRoundQ1QuestionField = <HTMLInputElement>fixture.debugElement.query(By.css("#round1question0")).nativeElement;
      expect(secondRoundQ1QuestionField.value).toEqual('2nd Round First question?');

      const secondRoundQ1NumberField = <HTMLInputElement>fixture.debugElement.query(By.css("#round1number0")).nativeElement;
      expect(secondRoundQ1NumberField.value).toEqual('1');

      const secondRoundQ2QuestionField = <HTMLInputElement>fixture.debugElement.query(By.css("#round1question1")).nativeElement;
      expect(secondRoundQ2QuestionField.value).toEqual('2nd Round Second question?');

      const secondRoundQ2NumberField = <HTMLInputElement>fixture.debugElement.query(By.css("#round1number1")).nativeElement;
      expect(secondRoundQ2NumberField.value).toEqual('2');

    });
  }));
});
