import { Component, Input } from '@angular/core';

@Component({
    selector: 'count-down',
    template: `<h1>{{displayString}}</h1>
  <ng-content></ng-content>
  `
})
export class CountdownTimer {

}
