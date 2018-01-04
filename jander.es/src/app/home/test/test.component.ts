import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TestResponse} from './test-response';

@Component({
  selector: 'app-test',
  template: `
    <div>
        <button class="btn btn-default" (click)="switch()">switch ({{value}})</button>
        <p>Content always visible (source ip: {{result || 'unknown'}})</p>
        <p *ngIf="value == 'one'; else second">Value {{value}} == 'one'</p>
        <ng-template #second>
          <p>Value {{value}} == 'two'</p>
        </ng-template>
    </div>`,
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  value = 'one';
  result = undefined;

  constructor(private http: HttpClient) { }

  switch () {
    this.value = this.value === 'one' ? 'two' : 'one';

    const payload = {
      origin: '10.0.1.1'
    };

    const config = {
      params: new HttpParams().set('status', 'ok'),
      headers: new HttpHeaders({ 'x-id': 'demo' })
    };

    this.http.post<TestResponse>('https://httpbin.org/post', payload, config).subscribe(res => {

      this.result = res.data && JSON.parse(res.data).origin || 'unknown';
      console.log(res);
    });
  }
}
