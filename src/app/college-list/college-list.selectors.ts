import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollegeListState } from './college-list.reducer';

export const selectCollegeListState = createFeatureSelector<CollegeListState>('collegeList');

export const selectColleges = createSelector(
  selectCollegeListState,
  (state) => state.colleges
);

export const selectCollegesLoading = createSelector(
  selectCollegeListState,
  (state) => state.loading
);

export const selectCollegesError = createSelector(
  selectCollegeListState,
  (state) => state.error
);

export const selectCurrentPage = createSelector(
  selectCollegeListState,
  (state) => state.currentPage
);

export const selectPageSize = createSelector(
  selectCollegeListState,
  (state) => state.pageSize
);

export const selectPaginatedColleges = createSelector(
  selectColleges,
  selectCurrentPage,
  selectPageSize,
  (colleges, currentPage, pageSize) => {
    const start = (currentPage - 1) * pageSize;
    return colleges.slice(start, start + pageSize);
  }
);