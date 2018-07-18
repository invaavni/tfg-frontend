import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    "./app.component.scss"
  ]
})
export class AppComponent {
  title = 'app';
  private menu_data: any;
  constructor(){
    this.menu_data = [
      {
        name: "Home",
        link: "/",
        active: true
      }
    ]
  }
}
