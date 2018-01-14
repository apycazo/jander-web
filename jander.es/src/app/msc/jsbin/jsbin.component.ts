import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jsbin',
  templateUrl: './jsbin.component.html',
  styleUrls: ['./jsbin.component.scss']
})
export class JsbinComponent {

  // Use like:
  // <app-jsbin link="https://jsbin.com/japekik/1/edit?html,css,js,output" text="JSBin"></app-jsbin>

  @Input() link: string;
  @Input() text: string;

  constructor() { }
}
