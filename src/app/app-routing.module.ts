import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ExportComponent } from './export/export.component';
import { ImportComponent } from './import/import.component';
import { RunQuizComponent } from './run-quiz/run-quiz.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz-builder', component: QuizComponent },
  { path: 'export', component: ExportComponent },
  { path: 'import', component: ImportComponent },
  { path: 'quiz', component: RunQuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
