import { collegeListReducer, initialState, CollegeListState } from './college-list.reducer';
import * as CollegeListActions from './college-list.actions';
import { College } from './college-list.model';

describe('CollegeListReducer', () => {
  const mockColleges: College[] = [
    { id: 1, name: 'A', city: '', state: '', numStudents: 0, tuitionAndFees: 0, numMajors: 0, hasSports: false }
  ];

  it('should set loading.list true and clear error on loadColleges', () => {
    const state = collegeListReducer(initialState, CollegeListActions.loadColleges());
    expect(state.loading.list).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should set colleges and loading.list false on loadCollegesSuccess', () => {
    const state = collegeListReducer(
      { ...initialState, loading: { ...initialState.loading, list: true } },
      CollegeListActions.loadCollegesSuccess({ colleges: mockColleges })
    );
    expect(state.colleges).toEqual(mockColleges);
    expect(state.loading.list).toBeFalse();
  });

  it('should set error and loading.list false on loadCollegesFailure', () => {
    const error = { message: 'fail' };
    const state = collegeListReducer(
      { ...initialState, loading: { ...initialState.loading, list: true } },
      CollegeListActions.loadCollegesFailure({ error })
    );
    expect(state.error).toEqual(error);
    expect(state.loading.list).toBeFalse();
  });

  it('should set navigating flag on setNavigating', () => {
    const state = collegeListReducer(initialState, CollegeListActions.setNavigating({ navigating: true }));
    expect(state.loading.navigating).toBeTrue();
  });

  it('should set currentPage on setPage', () => {
    const state = collegeListReducer(initialState, CollegeListActions.setPage({ page: 3 }));
    expect(state.currentPage).toBe(3);
  });

  it('should set pageSize on setPageSize', () => {
    const state = collegeListReducer(initialState, CollegeListActions.setPageSize({ pageSize: 25 }));
    expect(state.pageSize).toBe(25);
  });

  it('should set filter and reset currentPage on setFilter', () => {
    const state = collegeListReducer(
      { ...initialState, currentPage: 5 },
      CollegeListActions.setFilter({ filter: 'test' })
    );
    expect(state.filter).toBe('test');
    expect(state.currentPage).toBe(1);
  });

  it('should set sortBy and sortDirection on setSort', () => {
    const state = collegeListReducer(
      initialState,
      CollegeListActions.setSort({ sortBy: 'name', sortDirection: 'desc' })
    );
    expect(state.sortBy).toBe('name');
    expect(state.sortDirection).toBe('desc');
  });

  it('should reset filters, currentPage, sortBy, and sortDirection on resetFilters', () => {
    const prevState: CollegeListState = {
      ...initialState,
      filter: 'abc',
      currentPage: 3,
      sortBy: 'name',
      sortDirection: 'desc'
    };
    const state = collegeListReducer(prevState, CollegeListActions.resetFilters());
    expect(state.filter).toBe('');
    expect(state.currentPage).toBe(1);
    expect(state.sortBy).toBe('id');
    expect(state.sortDirection).toBe('asc');
  });
});