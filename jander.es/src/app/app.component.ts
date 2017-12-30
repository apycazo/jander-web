import { Component } from '@angular/core';
import { SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Jander.es';

  constructor(private sharedSvc: SharedService) {

    console.log('version: ', sharedSvc.version, ', full version:', sharedSvc.fullVersion());
  }
}
