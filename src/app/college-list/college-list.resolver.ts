import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import * as CollegeListActions from './college-list.actions';
import * as CollegeListSelectors from './college-list.selectors';

export const collegeListResolver: ResolveFn<boolean> = () => {
    const store: Store = inject(Store);
    // Dispatch loadColleges if not already loaded
    store.dispatch(CollegeListActions.loadColleges());
    // Wait until colleges are loaded (not loading)
    return store.select(CollegeListSelectors.selectListLoading).pipe(
        filter(loading => loading === false),
        first(),
    );
}