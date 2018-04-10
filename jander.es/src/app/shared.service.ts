import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  version = 1.0;
  readonly basePath = 'assets/docs/';
  readonly content = [
    {
      name: 'devops', text: 'DevOps', prefix: 'devops__',
      pages: [
        {
          title: 'General resources',
          ref: 'resources',
          description: 'Online reference pages, resources and apps'
        },
        {
          title: 'Bash shell',
          ref: 'bash',
          description: 'Bash shell tips and code snippets'
        },
        {
          title: 'Git version control',
          ref: 'git',
          description: 'Git respository cheatsheet, commands and samples'
        },
        {
          title: 'Docker',
          ref: 'docker',
          description: 'Docker container usage, command cheatsheet and snippets'
        },
        {
          title: 'Big Data',
          ref: 'bigdata',
          description: 'Guide on how to install and configure a simple big data environment',
          chapters: [
            'hadoop', 'yarn', 'hive', 'spark'
          ]
        },
        {
          title: 'Editors',
          ref: 'editors',
          description: 'Usage tips and references on some common editors and IDEs',
          chapters: [
            'idea', 'atom', 'vim'
          ]
        },
        {
          title: 'Web/App servers',
          ref: 'webservers',
          description: 'How to set up and configure typical application servers',
          chapters: [
            'nginx', 'tomcat'
          ]
        },
        {
          title: 'Virtualbox Linux',
          ref: 'linuxvm',
          description: 'How do I usually configure a linux (fedora) virtual machine for development',
          chapters: [
            'packages-to-install',
            'configuration',
            'customize-bashrc',
            'software',
            'maintenance'
          ]
        }
      ]
    },
    {
      name: 'java', text: 'Java references', prefix: 'java__',
      pages: [
        {
          title: 'Sample quote service',
          ref: 'demo-quote-service',
          description: 'A spring rest service to copy-paste on existing projects to serve as a test'
        },
        {
          title: 'How to run exec from java',
          ref: 'java-exec',
          description: 'Sources to execute external apps from Java runtime'
        },
        {
          title: 'Reading properties file',
          ref: 'property-reader',
          description: 'Java code to read and parse property files on non-spring apps'
        },
        {
          title: 'Javalin rest service',
          ref: 'javalin',
          description: 'A simple framework for creating light rest services',
          chapters: [
            'setup',
            'routing',
            'context',
            'handlers',
            'security',
            'packaging'
          ]
        },
        {
          title: 'Json Web Tokens (JWT)',
          ref: 'jwt',
          description: 'How to generate and use JSON web tokens for security'
        }
      ]
    },
    {
      name: 'spring', text: 'Spring Framework', prefix: 'spring__',
      pages: [
        {
          title: 'Rest services with Spring',
          ref: 'restservices',
          description: 'How to set up a project for rest services using spring/spring cloud',
          chapters: [
            'project-setup',
            'service-setup',
            'discovery-with-eureka',
            'spring-boot-admin',
            'cloud-config'
          ]
        },
        {
          title: 'Spring HTTP',
          ref: 'springhttp',
          description: 'Customizing and extracting data from spring http elements',
          chapters: [
            'http-servlet-object',
            'proxy-request',
            'cross-domain-requests',
            'ssl',
            'response-filter'
          ]
        },
        {
          title: 'Spring boot testing',
          ref: 'testing',
          description: 'Testing setup and examples for spring boot test',
          chapters: [
            'mocking-beans',
            'testing-json-objects',
            'testing-rest-controllers',
            'rest-template-mocked-server'
          ]
        },
        {
          title: 'Spring snippets',
          ref: 'snippets',
          description: 'Code snippets for several spring related functionalities',
          chapters: [
            'mvc-custom-config',
            'rest-controllers',
            'jackson',
            'custom-rest-template',
            'async-config',
            'scheduling',
            'caching',
            'json-view',
            'interceptors'
          ]
        },
        {
          title: 'Proxying beans with Spring Boot',
          ref: 'proxies',
          description: 'Instructions on how to create a spring-like proxy instance of a given class'
        },
        {
          title: 'Spring Boot Admin',
          ref: 'springbootadmin',
          description: 'Integrating spring boot admin on a spring cloud enabled app'
        },
        {
          title: 'Feign',
          ref: 'feign',
          description: 'Using feign to auto generate http clients based on interfaces',
          chapters: [ 'open-feign', 'spring-feign' ]
        }
      ]
    },
    {
      name: 'javascript', text: 'Javascript', prefix: 'javascript__',
      pages : [
        {
          title: 'Introduction',
          ref: 'introduction',
          description: 'Introduction to javascript basic features',
          chapters: [
            'basics',
            'promises',
            'classes',
            'prototypes',
            'dates'
          ]
        },
        {
          title: 'VueJS',
          ref: 'vuejs',
          description: 'Basic guide and component cheatsheet for VueJS',
          chapters: [
            'setup',
            'data-binding',
            'events',
            'conditionals',
            'classes',
            'components'
          ]
        },
        {
          title: 'AngularJS',
          ref: 'angularjs-basic',
          description: 'Basic guide and component cheatsheet for AngularJS (1.x)',
          chapters: [
            'project-setup',
            'configuration',
            'core-directive-ngrepeat',
            'core-directive-ngif',
            'core-directive-ngswitch',
            'http-client',
            'routing',
            'forms',
            'starter'
          ]
        },
        {
          title: 'Angular2+',
          ref: 'angular-basic',
          description: 'Basic guide and component cheatsheet for Angular 2+',
          chapters: [
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
          ]
        },
        {
          title: 'Angular advanced',
          ref: 'angular-advanced',
          description: 'More advanced features and components for Angular 2+',
          chapters: [
          'component-lifecycle',
          'pipes'
          ]
        }
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
      const groupPages: object[] = this.content.filter(v => id.startsWith(v.prefix))[0].pages;
      return groupPages.find(v => id.endsWith(v['ref']));
      // return group.pages.filter(v => id.endsWith(v.ref))[0];
    } catch (err) {
      // no data available
      return {};
    }
  }

}
