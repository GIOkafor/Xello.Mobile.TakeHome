import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-college-details-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container college-details-skeleton">
      <!-- Back Button Skeleton -->
      <div class="mb-4">
        <span class="placeholder col-3 btn btn-primary disabled"></span>
      </div>

      <!-- Card Skeleton -->
      <div class="row g-4">
        <div class="col-md-12">
          <div class="card p-3">
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-5"></span>
            </div>
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-8"></span>
            </div>
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-6"></span>
            </div>
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-8"></span>
            </div>
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-6"></span>
            </div>
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-5"></span>
            </div>
            <div class="placeholder-glow mb-2">
              <span class="placeholder col-4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .college-details-skeleton {
      width: 320px;
    }
  `]
})
export class CollegeDetailsSkeletonComponent {}