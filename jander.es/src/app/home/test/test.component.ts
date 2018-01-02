import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: '<div><button class="btn btn-primary" (click)="msg()">Click me</button></div>',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor() { }

  msg () {
    alert('clicked!');
  }
}
