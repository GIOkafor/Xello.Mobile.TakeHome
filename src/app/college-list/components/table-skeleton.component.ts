import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="table">
        <thead>
        <tr>
            <th><div class="placeholder-glow"><span class="placeholder col-2"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-4"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-3"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-2"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-3"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-3"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-2"></span></div></th>
            <th><div class="placeholder-glow"><span class="placeholder col-2"></span></div></th>
        </tr>
        </thead>
        <tbody>
        <!-- Generate 10 skeleton rows -->
        <tr *ngFor="let item of skeletonRows">
            <td><div class="placeholder-glow"><span class="placeholder col-1"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-6"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-4"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-2"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-2"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-3"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-1"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-2"></span></div></td>
        </tr>
        </tbody>
    </table>
  `,
  styles: [`
    .table {
        width: 90vw;
    }
  `]
})
export class TableSkeletonComponent {
  @Input() rowCount: number = 10;
  
  get skeletonRows(): number[] {
    return Array(this.rowCount).fill(0).map((_, i) => i + 1);
  }
}