import { initFederation } from '@angular-architects/native-federation';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mfe1';
  constructor() {

  }
  doStuff() {
    alert('Hallo Welt!');
  }
}

export default AppComponent;