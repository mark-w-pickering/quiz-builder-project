import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const uploadedFile = reader.result as string;

        if (uploadedFile) {
          // Save to local storage
          localStorage.setItem('quizData', uploadedFile);

          // Navigate to main Quiz Builder Page
          this.router.navigate(['/quiz-builder']);
        }
      });

      reader.readAsText(file, "UTF-8");
    }
  }
}
