import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooComponent } from './pages/foo/foo.component';
import { ExposeAnimatedBoxComponent } from './exposes/expose-animated-box.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooComponent, ExposeAnimatedBoxComponent],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe2';
}
