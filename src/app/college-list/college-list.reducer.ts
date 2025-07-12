import { createReducer, on } from '@ngrx/store';
import * as CollegeListActions from './college-list.actions';
import { College } from './college-list.model';

export interface CollegeListState {
  colleges: College[];
  loading: {
    list: boolean;
    navigating: boolean;
  };
  error: any;
  currentPage: number;
  pageSize: number;
  filter: string;
  sortBy: string | number;
  sortDirection: 'asc' | 'desc';
}

export const initialState: CollegeListState = {
  colleges: [],
  loading: {
    list: false,
    navigating: false
  },
  error: null,
  currentPage: 1,
  pageSize: 10,
  filter: '',
  sortBy: 'id',
  sortDirection: 'asc' as const,
};

export const collegeListReducer = createReducer(
  initialState,
  on(CollegeListActions.loadColleges, (state) => ({ 
    ...state, 
    loading: {
      ...state.loading,
      list: true
    }, 
    error: null 
  })),
  on(CollegeListActions.loadCollegesSuccess, (state, { colleges }) => ({ 
    ...state, 
    colleges, 
    loading: {
      ...state.loading,
      list: false
    } 
  })),
  on(CollegeListActions.loadCollegesFailure, (state, { error }) => ({ 
    ...state, 
    loading: {
      ...state.loading,
      list: false
    }, 
    error 
  })),
  on(CollegeListActions.setNavigating, (state, { navigating }) => ({
    ...state,
    loading: { ...state.loading, navigating }
  })),
  on(CollegeListActions.setPage, (state, { page }) => ({ ...state, currentPage: page })),
  on(CollegeListActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize })),
  on(CollegeListActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
    currentPage: 1 // reset to first page on filter change
  })),
  on(CollegeListActions.setSort, (state, { sortBy, sortDirection }) => ({
    ...state,
    sortBy,
    sortDirection
  })),
  on(CollegeListActions.resetFilters, (state) => ({
    ...state,
    filter: '',
    currentPage: 1,
    sortBy: 'id',
    sortDirection: 'asc' as const
  })),
);
