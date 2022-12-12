import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunQuizComponent } from './run-quiz.component';

describe('RunQuizComponent', () => {
  let component: RunQuizComponent;
  let fixture: ComponentFixture<RunQuizComponent>;

  beforeEach(async () => {
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
});
