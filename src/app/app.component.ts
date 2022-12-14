import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-builder-project';
  showNav = true;

  constructor() {
  }

  ngOnInit(): void {
    if (this.getPathname() === "/quiz") {
      this.showNav = false;
    }
  }

  getPathname() {
    return window.location.pathname;
  }
}
