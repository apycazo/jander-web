import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly content = [];

  constructor(private sharedService: SharedService, private router: Router) {
    this.content = sharedService.content;
  }

  // scroll to top on route changes
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
