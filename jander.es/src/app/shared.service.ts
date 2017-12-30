import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  version = 1.0;

  constructor() {

  }

  fullVersion () {
    return `v${this.version}`;
  }

  idToPath(id: string) {
    return id.split('__').join('/') + '.md';
  }

}
