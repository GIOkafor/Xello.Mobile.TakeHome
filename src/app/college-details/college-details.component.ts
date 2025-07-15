import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { College } from '../college-list/college-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import * as CollegeListSelectors from '../college-list/college-list.selectors';
import * as CollegeListActions from '../college-list/college-list.actions';

@Component({
  selector: 'app-college-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './college-details.component.html',
  styleUrl: './college-details.component.scss'
})
export class CollegeDetailsComponent implements OnInit {
  college$: Observable<College | undefined> = combineLatest([
    this.route.paramMap,
    this.store.select(CollegeListSelectors.selectColleges)
  ]).pipe(
    map(([params, colleges]) => {
      const id = Number(params.get('id'));
      return colleges.find(c => c.id === id);
    })
  );

  constructor(
    private route: ActivatedRoute, 
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(CollegeListActions.setNavigating({ navigating: false }));
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
