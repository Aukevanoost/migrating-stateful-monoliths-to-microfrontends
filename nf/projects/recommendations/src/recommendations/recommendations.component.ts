import { Component, inject } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';

@Component({
  selector: 'exp-recommendations',
  standalone: true,
  imports: [fromCDNPipe, CommonModule, AsyncPipe],
  providers: [FeaturedHttpService],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {
  http = inject(FeaturedHttpService);
  recommendations$ = this.http.recommendations$(["CL-01-GY","AU-07-MT"]);
}