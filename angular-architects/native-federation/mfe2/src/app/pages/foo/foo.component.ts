import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExposeAnimatedBoxComponent } from '../../exposes/expose-animated-box.component';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [CommonModule, ExposeAnimatedBoxComponent ],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.scss'
})
export class FooComponent {

}
