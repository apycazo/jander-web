import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly content = [];

  constructor(private sharedService: SharedService) {
    this.content = sharedService.content;
  }

  ngOnInit() {
    // nothing to do
  }

}
