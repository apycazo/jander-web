import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly content = [];

  constructor(private sharedService: SharedService) {

    this.content = sharedService.content;
  }

  ngOnInit() {
  }

}
