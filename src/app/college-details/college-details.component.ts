import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { College } from '../college-list/college-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';
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
  private destroy$ = new Subject<void>();
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
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.store.dispatch(CollegeListActions.setNavigating({ navigating: false }));
    this.college$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(college => {
      if (college) {
        this.title.setTitle(`${college.name} - College Details`);
        this.meta.updateTag({
          name: 'description',
          content: `More details on ${college.name} college. Learn about city, state, tuition fees, and campus life.`
        });
      } else {
        this.title.setTitle('College Details');
        this.meta.updateTag({
          name: 'description',
          content: 'College details page.'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
