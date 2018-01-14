import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  version = 1.0;
  readonly basePath = 'assets/docs/';
  readonly content = [
    {
      name: 'devops', text: 'DevOps', prefix: 'devops__',
      pages: [
        { title: 'General resources', ref: 'resources' },
        { title: 'Bash shell', ref: 'bash' },
        { title: 'Git version control', ref: 'git' },
        { title: 'Docker', ref: 'docker' },
        { title: 'Editors', ref: 'editors', chapters: [
          'idea', 'atom', 'vim'
        ]},
        { title: 'Web/App servers', ref: 'webservers', chapters: [
          'nginx', 'tomcat'
        ]},
        { title: 'Virtualbox Linux', ref: 'linuxvm', chapters: [
          'packages-to-install',
          'configuration',
          'customize-bashrc',
          'software',
          'maintenance'
        ] }
      ]
    },
    {
      name: 'spring', text: 'Spring', prefix: 'spring__',
      pages: [
        { title: 'Microservices with Spring', ref: 'microservices', chapters: [
          'project-setup',
          'service-setup',
          'discovery-with-eureka',
          'spring-boot-admin',
          'cloud-config'
        ] },
        { title: 'Spring Rest', ref: 'springrest', chapters: [
          'http-servlet-object',
          'proxy-request',
          'cross-domain-requests',
          'ssl',
          'response-filter'
        ] },
        { title: 'Spring boot testing', ref: 'testing', chapters: [
          'mocking-beans',
          'testing-json-objects',
          'testing-rest-controllers'
        ] },
        { title: 'Proxying beans with Spring Boot', ref: 'proxies' },
        { title: 'Spring Boot Admin', ref: 'springbootadmin' }
      ]
    },
    {
      name: 'javascript', text: 'Javascript', prefix: 'javascript__',
      pages : [
        { title: 'Introduction', ref: 'introduction', chapters: [
          'basics',
          'promises',
          'classes',
          'prototypes',
          'dates'
        ]},
        { title: 'AngularJS', ref: 'angularjs-basic', chapters: [
          'project-setup',
          'configuration',
          'core-directive-ngrepeat',
          'core-directive-ngif',
          'core-directive-ngswitch',
          'http-client',
          'starter'
        ]},
        { title: 'Angular2+', ref: 'angular-basic', chapters: [
          'project-setup',
          'components',
          'services',
          'property-binding',
          'event-binding',
          'core-directive-ngfor',
          'core-directive-ngif',
          'core-directive-ngswitch',
          'http-client',
          'deploying',
          'others'
        ]},
        { title: 'Angular advanced', ref: 'angular-advanced', chapters: [
          'component-lifecycle',
          'pipes'
        ]}
      ]
    }
    // ,
    // {
    //   name: 'test', text: 'Test docs', prefix: 'test__',
    //   pages: [
    //     { title: 'Test page one', ref: 'test' },
    //     { title: 'Test page two', ref: 'test2' }
    //   ]
    // }
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

  generatePaths(id: string, config) {

    const paths = [];

    if (config && config.chapters) {
      const entryPath = this.basePath + id.split('__').join('/');
      config.chapters.forEach(chapter => {
        paths.push(entryPath + '/' + chapter + '.md');
      });

    } else {
      paths.push(id.split('__').join('/') + '.md');
    }

    return paths;
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
