import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  version = 1.0;
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
        { title: 'Spring boot testing', ref: 'testing', chapters: [
          'mocking-beans',
          'testing-json-objects',
          'rest-controller-tests'
        ] },
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

  constructor() {
    // empty
  }

  fullVersion () {
    return `v${this.version}`;
  }

  idToPath(id: string) {
    return id.split('__').join('/') + '.md';
  }

  configForRoute (id: string) {

    try {
      const group = this.content.filter(v => id.startsWith(v.prefix))[0];
      return group.pages.filter(v => id.endsWith(v.ref))[0];
    } catch (err) {
      // no data available
      return {};
    }
  }

}
