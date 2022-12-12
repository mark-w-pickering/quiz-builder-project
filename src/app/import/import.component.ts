import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const uploadedFile = reader.result as string;

        if (uploadedFile) {
           localStorage.setItem('quizData', uploadedFile);
        }
      });

      reader.readAsText(file, "UTF-8");
    }
  }
}
