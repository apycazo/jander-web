import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  readonly basePath = 'assets/docs/';
  docPath = '';

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(res => {
      // build the doc path
      this.docPath = this.basePath + res.id.split('__').join('/') + '.md';
    });
  }

  ngOnInit() {
  }

}
