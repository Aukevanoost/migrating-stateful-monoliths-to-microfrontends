import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-animated-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-box.component.html',
  styleUrl: './animated-box.component.scss'
})
export class AnimatedBoxComponent implements OnInit {
    constructor(private dataService: DataService) {}
    ngOnInit() {
        this.dataService.fetchData().subscribe((data) => {
            console.log("AnimatedBoxComponent: ", data);
        });
    }
}
