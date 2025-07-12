import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollegeListState } from './college-list.reducer';
import { College } from './college-list.model';

export const selectCollegeListState = createFeatureSelector<CollegeListState>('collegeList');

export const selectColleges = createSelector(
  selectCollegeListState,
  (state) => state.colleges
);

export const selectListLoading = createSelector(
  selectCollegeListState,
  (state) => state.loading.list
);

export const selectNavigating = createSelector(
  selectCollegeListState,
  (state) => state.loading.navigating
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

export const selectFilter = createSelector(
  selectCollegeListState,
  (state) => state.filter
);

export const selectFilteredColleges = createSelector(
  selectColleges,
  selectFilter,
  (colleges, filter) => {
    if (!filter) return colleges;
    return colleges.filter(college =>
      college.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectSortBy = createSelector(
  selectCollegeListState,
  (state) => state.sortBy
);

export const selectSortDirection = createSelector(
  selectCollegeListState,
  (state) => state.sortDirection
);

export const selectFilteredSortedColleges = createSelector(
  selectFilteredColleges,
  selectSortBy,
  selectSortDirection,
  (colleges, sortBy, sortDirection) => {
    return [...colleges].sort((a, b) => {
      const aValue = (a[sortBy as keyof College] ?? '');
      const bValue = (b[sortBy as keyof College] ?? '');

      if(typeof aValue === 'number' && typeof bValue === 'number'){
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = (aValue ?? '').toString().toLowerCase();
      const bString = (bValue ?? '').toString().toLowerCase();
      if (aString < bString) return sortDirection === 'asc' ? -1 : 1;
      if (aString > bString) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
);

export const selectPaginatedColleges = createSelector(
  selectFilteredSortedColleges, // use sorted+filtered
  selectCurrentPage,
  selectPageSize,
  (colleges, currentPage, pageSize) => {
    const start = (currentPage - 1) * pageSize;
    return colleges.slice(start, start + pageSize);
  }
);