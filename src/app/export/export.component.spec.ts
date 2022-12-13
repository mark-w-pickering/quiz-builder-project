import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExportComponent } from './export.component';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ ExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
