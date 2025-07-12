import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject, combineLatest, map, first } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { College } from './college-list.model';
import * as CollegeListActions from './college-list.actions';
import * as CollegeListSelectors from './college-list.selectors';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-college-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './college-list.component.html',
  styleUrl: './college-list.component.scss'
})
export class CollegeListComponent {
  colleges$: Observable<College[]> = this.store.select(CollegeListSelectors.selectColleges);
  loading$: Observable<boolean> = this.store.select(CollegeListSelectors.selectCollegesLoading);
  error$: Observable<any> = this.store.select(CollegeListSelectors.selectCollegesError);
  paginatedColleges$: Observable<College[]> = this.store.select(CollegeListSelectors.selectPaginatedColleges);
  currentPage$: Observable<number> = this.store.select(CollegeListSelectors.selectCurrentPage);
  pageSize$: Observable<number> = this.store.select(CollegeListSelectors.selectPageSize);
  totalPages$ = combineLatest([
    this.colleges$,
    this.pageSize$
  ]).pipe(
    map(([colleges, pageSize]) => Math.ceil((colleges?.length || 0) / pageSize))
  );

  filter = '';

  private pollingSub: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    // Polling every 30 seconds experiment to see if it's better with the button
    // this.pollingSub = interval(30000).subscribe(() => {
    //   this.store.dispatch(CollegeListActions.loadColleges());
    // });
    this.store.dispatch(CollegeListActions.loadColleges());
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(index: number, item: College) {
    return item.id;
  }

  onRowClick(college: College) {
    this.router.navigate(['/college', college.id]);
  }

  refreshCollegeList() {
    this.store.dispatch(CollegeListActions.loadColleges());
  }

  onPageChange(newPage: number) {
    this.store.dispatch(CollegeListActions.setPage({ page: newPage }));
  }

  onPageSizeChange(newPageSize: number) {
    this.store.dispatch(CollegeListActions.setPageSize({ pageSize: newPageSize }));
  }

  onFilterChange(newFilter: string) {
    this.store.dispatch(CollegeListActions.setFilter({ filter: newFilter }));
  }

  private getSortConfig(sortBy: string) {
    return combineLatest([
      this.store.select(CollegeListSelectors.selectSortBy),
      this.store.select(CollegeListSelectors.selectSortDirection)
    ]).pipe(
      first(),
      map(([currentSortBy, currentDirection]) => {
        const newDirection = (currentSortBy === sortBy && currentDirection === 'asc') 
          ? 'desc' as const 
          : 'asc' as const;
        
        return { sortBy, sortDirection: newDirection };
      })
    );
  }

  onSort(sortBy: string) {
    this.getSortConfig(sortBy).pipe(
      takeUntil(this.destroy$)
    ).subscribe(sortConfig => {
      this.store.dispatch(CollegeListActions.setSort(sortConfig));
    });
  }
}
