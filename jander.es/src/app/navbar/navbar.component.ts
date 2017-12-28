import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly content = [
    {
      name: 'Test',
      text: 'Test docs',
      prefix: 'test__',
      pages: [
        {
          title: 'Test page one',
          ref: 'test'
        },
        {
          title: 'Test page two',
          ref: 'test2'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
