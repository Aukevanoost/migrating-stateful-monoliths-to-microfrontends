import { Component, ViewEncapsulation } from '@angular/core';
import { toPath } from '../utils/to-path.pipe';

@Component({
  selector: 'exp-root',
  standalone: true,
  imports: [toPath],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TeasersComponent {
  title = 'teasers';
}
