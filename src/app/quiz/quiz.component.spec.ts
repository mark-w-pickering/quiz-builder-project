import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    let store:any = {
      'quizData': '{"name": "Test quiz"}'
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

  it('should be able to add rounds and questions', () => {
    fixture.detectChanges();

    let questionField = fixture.nativeElement.querySelector('#round0question0');
    expect(questionField).toBe(null);

    const addRoundButton = fixture.nativeElement.querySelector('#add-round-btn');
    addRoundButton.click(0);

    fixture.detectChanges();

    const addRoundOneQuestionButton = fixture.nativeElement.querySelector('#add-question-round0-btn');
    addRoundOneQuestionButton.click(0);

    fixture.detectChanges();

    questionField = fixture.nativeElement.querySelector('#round0question0');
    expect(questionField).not.toBe(null);

  });
});
