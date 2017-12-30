import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, AfterViewInit {

  readonly basePath = 'assets/docs/';
  docPath = '';

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(res => {
      // build the doc path
      this.docPath = this.basePath + res.id.split('__').join('/') + '.md';
    });
  }

  ngOnInit() {
    // empty
  }

  ngAfterViewInit(): void {
    const h1 = $('h1');
    console.log('after content: ', h1.length);
  }

}
