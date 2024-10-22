import { Component } from '@angular/core';
import { AnimatedBoxComponent } from '../components/animated-box/animated-box.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-expose-animated-box',
  standalone: true,
  imports: [AnimatedBoxComponent],
  providers: [DataService],
  template: `<app-animated-box></app-animated-box>`,
  styles: []
})
export class ExposeAnimatedBoxComponent {

}
