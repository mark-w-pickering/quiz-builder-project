import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    let store:any = {
      'quizData': '{"name":"Test quiz","backgroundColour":"#FFFFFF","showAnswers":"each"}'
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


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be able to add change Quiz settings', () => {
    fixture.detectChanges();

    component.quizFormData.setValue({
      "name": "New Quiz Name",
      "backgroundColour": "#EEEEEE",
      "showAnswers": "end",
      "rounds": []
    });

    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById("name")).value).toEqual('New Quiz Name');
  });


  it('should be able to add and remove rounds and questions', () => {
    fixture.detectChanges();
    // Check fields are not currently present
    let roundNameField = fixture.nativeElement.querySelector('#name0');
    expect(roundNameField).toBe(null);

    let questionField = fixture.nativeElement.querySelector('#round0question0');
    expect(questionField).toBe(null);

    // Add round
    const addRoundButton = fixture.nativeElement.querySelector('#add-round-btn');
    addRoundButton.click(0);
    fixture.detectChanges();

    roundNameField = fixture.nativeElement.querySelector('#name0');
    expect(roundNameField).not.toBe(null);

    // Add question
    const addRoundOneQuestionButton = fixture.nativeElement.querySelector('#add-question-round0-btn');
    addRoundOneQuestionButton.click(0);
    fixture.detectChanges();

    questionField = fixture.nativeElement.querySelector('#round0question0');
    expect(questionField).not.toBe(null);

    // Remove question
    const removeQuestionLink = fixture.nativeElement.querySelector('#remove-r0-q0');
    removeQuestionLink.click(0);
    fixture.detectChanges();

    const confirmRemoveQuestionButton = fixture.nativeElement.querySelector('#confirm-remove-question');
    confirmRemoveQuestionButton.click(0);
    fixture.detectChanges();

    questionField = fixture.nativeElement.querySelector('#round0question0');
    expect(questionField).toBe(null);

    // Remove round
    const removeRoundLink = fixture.nativeElement.querySelector('#remove-r0');
    removeRoundLink.click(0);
    fixture.detectChanges();

    const confirmRemoveRoundButton = fixture.nativeElement.querySelector('#confirm-remove-round');
    confirmRemoveRoundButton.click(0);
    fixture.detectChanges();

    roundNameField = fixture.nativeElement.querySelector('#name0');
    expect(roundNameField).toBe(null);
  });


  it('should be able to clear all quiz data', () => {
    fixture.detectChanges();

    const resetQuizLink = fixture.nativeElement.querySelector('#reset-quiz');
    resetQuizLink.click(0);
    fixture.detectChanges();

    const confirmResetQuizButton = fixture.nativeElement.querySelector('#confirm-reset-quiz');
    confirmResetQuizButton.click(0);
    fixture.detectChanges();

    expect((<HTMLInputElement>document.getElementById("name")).value).toEqual('');

  });

});
