import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly content = [
    {
      name: 'devops', text: 'DevOps', prefix: 'devops__',
      pages: [
        { title: 'General resources', ref: 'resources' },
        { title: 'Intellij IDEA', ref: 'idea' },
        { title: 'Atom.io', ref: 'atom' },
        { title: 'Bash shell', ref: 'bash' },
        { title: 'Docker', ref: 'docker' }
      ]
    },
    {
      name: 'spring', text: 'Java/Spring', prefix: 'spring__',
      pages: [
        { title: 'Microservices with Spring', ref: 'microservice' },
        { title: 'Http clients and RestTemplate', ref: 'rest' },
        { title: 'Spring boot testing', ref: 'testing' },
        { title: 'Proxying beans with Spring Boot', ref: 'proxies' },
        { title: 'Spring Boot Admin', ref: 'springbootadmin' }
      ]
    },
    {
      name: 'angular', text: 'Angular/AngularJS', prefix: 'angular__',
      pages: [
        { title: 'Angular quick start', ref: 'angular' }
      ]
    },
    {
      name: 'test', text: 'Test docs', prefix: 'test__',
      pages: [
        { title: 'Test page one', ref: 'test' },
        { title: 'Test page two', ref: 'test2' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
