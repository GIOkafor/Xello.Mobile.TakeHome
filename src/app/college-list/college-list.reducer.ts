import { createReducer, on } from '@ngrx/store';
import * as CollegeListActions from './college-list.actions';
import { College } from './college-list.model';

export interface CollegeListState {
  colleges: College[];
  loading: boolean;
  error: any;
  currentPage: number;
  pageSize: number;
  filter: string;
  sortBy: string | number;
  sortDirection: 'asc' | 'desc';
}

export const initialState: CollegeListState = {
  colleges: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  filter: '',
  sortBy: 'id',
  sortDirection: 'asc',
};

export const collegeListReducer = createReducer(
  initialState,
  on(CollegeListActions.loadColleges, (state) => ({ ...state, loading: true, error: null })),
  on(CollegeListActions.loadCollegesSuccess, (state, { colleges }) => ({ ...state, colleges, loading: false })),
  on(CollegeListActions.loadCollegesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(CollegeListActions.setPage, (state, { page }) => ({ ...state, currentPage: page })),
  on(CollegeListActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize })),
  on(CollegeListActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
    currentPage: 1 // Optionally reset to first page on filter change
  })),
  on(CollegeListActions.setSort, (state, { sortBy, sortDirection }) => ({
    ...state,
    sortBy,
    sortDirection
  }))
);
