import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, AfterViewInit {

  readonly basePath = 'assets/docs/';
  docPath = '';
  config;
  selectedChapter = '';

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {

    this.route.params.subscribe(res => {
      // build the doc path
      this.docPath = this.basePath + res.id.split('__').join('/') + '.md';
      // extract config
      this.config = sharedService.configForRoute(res.id);
      this.selectedChapter = this.config && this.config.chapters && this.config.chapters[0] || '';
      console.log('active chapter: ', this.selectedChapter);
    });

    // find current navbar element


  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const h1 = $('h1');
    console.log('after content: ', h1.length);
  }

  scrollToId(id: string) {
    document.getElementById(id).scrollIntoView();
    // compensate fixed navbar: 50px
    window.scrollBy(0, -50);
  }

}
