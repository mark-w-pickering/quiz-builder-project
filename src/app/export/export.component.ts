import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  exportData: FormGroup;
  localData: any;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.exportData = this.fb.group({
      filename: [null]
    });

    this.localData = localStorage.getItem('quizData');

    // Pre-populate filename using quiz name, replacing spaces with hyphens
    setTimeout(() => {
      if (this.localData){
        let localDataObj: any;
        localDataObj = JSON.parse(this.localData) || {};

         this.exportData.controls['filename'].setValue(localDataObj.name.replaceAll(' ', '-'));
      }

    }, 10);
  }

  exportToText(): void {
    // Create temporary 'A' link, populate with values, trigger click then remove.
    const tempA = document.createElement("a");
    tempA.href = URL.createObjectURL(new Blob([this.localData], {
      type: "text/plain"
    }));
    tempA.setAttribute("download", `${this.exportData.get("filename")!.value}.txt`);
    document.body.appendChild(tempA);
    tempA.click();
    document.body.removeChild(tempA);

    // Navigate to main Quiz Builder Page
    this.router.navigate(['/quiz-builder']);
  }

}
