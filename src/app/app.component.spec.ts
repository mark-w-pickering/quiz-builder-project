import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'quiz-builder-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('quiz-builder-project');
  });

  it('should show nav and render quiz name in H1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(app.showNav).toEqual(true);
    expect(compiled.querySelector('h1')?.textContent).toContain('Quiz Builder');
  });

  it(`should hide nav in 'run quiz' mode`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app, 'getPathname').and.returnValue('/quiz');

    fixture.detectChanges();

    expect(app.showNav).toEqual(false);
  });
});
