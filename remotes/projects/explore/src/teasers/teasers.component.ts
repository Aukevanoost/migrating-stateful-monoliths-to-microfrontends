import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'exp-root',
  standalone: true,
  imports: [],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TeasersComponent {
  title = 'teasers';
}
