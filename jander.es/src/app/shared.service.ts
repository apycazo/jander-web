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
        { title: 'Big Data', ref: 'bigdata', chapters: [
          'hadoop', 'yarn', 'hive', 'spark'
        ] },
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
        ]}
      ]
    },
    {
      name: 'java', text: 'Java references', prefix: 'java__',
      pages: [
        { title: 'Sample quote service', ref: 'demo-quote-service' },
        { title: 'How to run exec from java', ref: 'java-exec' },
        { title: 'Reading properties file', ref: 'property-reader' },
        { title: 'Javalin rest service', ref: 'javalin', chapters: [
          'setup',
          'routing',
          'context',
          'handlers',
          'security',
          'packaging'
        ]},
        { title: 'Json Web Tokens (JWT)', ref: 'jwt' }
      ]
    },
    {
      name: 'spring', text: 'Spring Framework', prefix: 'spring__',
      pages: [
        { title: 'Rest services with Spring', ref: 'restservices', chapters: [
          'project-setup',
          'service-setup',
          'discovery-with-eureka',
          'spring-boot-admin',
          'cloud-config'
        ] },
        { title: 'Spring HTTP', ref: 'springhttp', chapters: [
          'http-servlet-object',
          'proxy-request',
          'cross-domain-requests',
          'ssl',
          'response-filter'
        ] },
        { title: 'Spring boot testing', ref: 'testing', chapters: [
          'mocking-beans',
          'testing-json-objects',
          'testing-rest-controllers',
          'rest-template-mocked-server'
        ] },
        { title: 'Spring snippets', ref: 'snippets', chapters: [
          'mvc-custom-config',
          'rest-controllers',
          'jackson',
          'custom-rest-template',
          'async-config',
          'scheduling',
          'caching'
        ] },
        { title: 'Proxying beans with Spring Boot', ref: 'proxies' },
        { title: 'Spring Boot Admin', ref: 'springbootadmin' },
        { title: 'Feign', ref: 'feign', chapters: [
          'open-feign', 'spring-feign'
        ] }
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
        { title: 'VueJS', ref: 'vuejs', chapters: [
          'setup',
          'data-binding',
          'events',
          'conditionals',
          'classes',
          'components'
        ]},
        { title: 'AngularJS', ref: 'angularjs-basic', chapters: [
          'project-setup',
          'configuration',
          'core-directive-ngrepeat',
          'core-directive-ngif',
          'core-directive-ngswitch',
          'http-client',
          'routing',
          'forms',
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
    //     { title: 'Test page two', ref: 'test2' },
    //     { title: 'CV', ref: 'cv' }
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
