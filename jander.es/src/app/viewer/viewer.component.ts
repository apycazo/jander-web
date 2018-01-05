import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements AfterViewInit {

  readonly basePath = 'assets/docs/';
  docPath = '';
  paths = [];
  config;
  selectedChapter = '';
  id = 'viewer';

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {

    this.route.params.subscribe(res => {
      // build the doc path
      this.docPath = this.basePath + res.id.split('__').join('/');
      // extract config
      this.config = sharedService.configForRoute(res.id);
      this.selectedChapter = this.config && this.config.chapters && this.config.chapters[0] || '';
      const gist = $('.gist-holder');
      if (gist) {
        console.log('located gist element!');
      } else {
        console.log('nothing found on route');
      }
    });
  }

  goToTopPage () {
    scroll(0, 0);
  }

  generateChapterTitle (chapter: string) {
    const title = chapter.split('-').join(' ');
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  generateChapterPath (chapter: string) {
    return this.docPath + '/' + chapter + '.md';
  }

  scrollToId(id: string) {
    document.getElementById(id).scrollIntoView();
    // compensate fixed navbar: 50px
    window.scrollBy(0, -60);
  }

  ngAfterViewInit () {
    const gist = $('.gist');
    if (gist) {
      console.log('located gist!');
    } else {
      console.log('nothing found');
    }
  }

}
