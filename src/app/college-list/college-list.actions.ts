import { createAction, props } from '@ngrx/store';
import { College } from './college-list.model';

export const loadColleges = createAction('[College List] Load Colleges');
export const loadCollegesSuccess = createAction('[College List] Load Colleges Success', props<{ colleges: College[] }>());
export const loadCollegesFailure = createAction('[College List] Load Colleges Failure', props<{ error: any }>());
export const setPage = createAction('[College List] Set Page', props<{ page: number }>());
export const setPageSize = createAction('[College List] Set Page Size', props<{ pageSize: number }>());
export const setFilter = createAction('[College List] Set Filter', props<{ filter: string }>());
export const setSort = createAction('[College List] Set Sort', props<{ sortBy: string|number; sortDirection: 'asc' | 'desc' }>());
export const resetFilters = createAction('[College List] Reset Filters');