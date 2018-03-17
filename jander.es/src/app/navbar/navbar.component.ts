import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly content = [];
  hideBanner = false;

  constructor(private sharedService: SharedService, private router: Router) {

    this.content = sharedService.content;
    router.events.subscribe((val: NavigationEnd) => {
      this.hideBanner = val.url === '/home' || val.url === '/';
    });
  }

  ngOnInit() {
    // empty
  }

}
