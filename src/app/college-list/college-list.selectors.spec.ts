import {
    selectCollegeListState,
    selectColleges,
    selectListLoading,
    selectNavigating,
    selectCollegesError,
    selectCurrentPage,
    selectPageSize,
    selectFilter,
    selectFilteredColleges,
    selectSortBy,
    selectSortDirection,
    selectFilteredSortedColleges,
    selectPaginatedColleges
  } from './college-list.selectors';
  import { CollegeListState } from './college-list.reducer';
  
  describe('College List Selectors', () => {
    let mockCollegeListState: CollegeListState;
    let mockAppState: { collegeList: CollegeListState };
  
    beforeEach(() => {
      mockCollegeListState = {
        colleges: [
          { id: 1, name: 'Harvard University', city: 'Boston', state: 'MA', numStudents: 23016, tuitionAndFees: 54269, numMajors: 50, hasSports: true },
          { id: 2, name: 'MIT', city: 'Cambridge', state: 'MA', numStudents: 11520, tuitionAndFees: 53818, numMajors: 30, hasSports: true },
          { id: 3, name: 'Stanford University', city: 'Stanford', state: 'CA', numStudents: 17249, tuitionAndFees: 56169, numMajors: 65, hasSports: true },
          { id: 4, name: 'Yale University', city: 'New Haven', state: 'CT', numStudents: 13609, tuitionAndFees: 59950, numMajors: 80, hasSports: true },
          { id: 5, name: 'Princeton University', city: 'Princeton', state: 'NJ', numStudents: 5426, tuitionAndFees: 56010, numMajors: 37, hasSports: false }
        ],
        loading: {
          list: false,
          navigating: true
        },
        error: null,
        currentPage: 1,
        pageSize: 3,
        filter: '',
        sortBy: 'name',
        sortDirection: 'asc'
      };
  
      mockAppState = {
        collegeList: mockCollegeListState
      };
    });
  
    describe('selectCollegeListState', () => {
      it('should select the college list state', () => {
        const result = selectCollegeListState(mockAppState);
        expect(result).toEqual(mockCollegeListState);
      });
    });
  
    describe('selectColleges', () => {
      it('should select colleges from state', () => {
        const result = selectColleges.projector(mockCollegeListState);
        expect(result).toEqual(mockCollegeListState.colleges);
      });
    });
  
    describe('selectListLoading', () => {
      it('should select list loading state', () => {
        const result = selectListLoading.projector(mockCollegeListState);
        expect(result).toBe(false);
      });
  
      it('should select list loading state when true', () => {
        mockCollegeListState.loading.list = true;
        const result = selectListLoading.projector(mockCollegeListState);
        expect(result).toBe(true);
      });
    });
  
    describe('selectNavigating', () => {
      it('should select navigating state', () => {
        const result = selectNavigating.projector(mockCollegeListState);
        expect(result).toBe(true);
      });
  
      it('should select navigating state when false', () => {
        mockCollegeListState.loading.navigating = false;
        const result = selectNavigating.projector(mockCollegeListState);
        expect(result).toBe(false);
      });
    });
  
    describe('selectCollegesError', () => {
      it('should select error state when null', () => {
        const result = selectCollegesError.projector(mockCollegeListState);
        expect(result).toBe(null);
      });
  
      it('should select error state when present', () => {
        mockCollegeListState.error = 'Failed to load colleges';
        const result = selectCollegesError.projector(mockCollegeListState);
        expect(result).toBe('Failed to load colleges');
      });
    });
  
    describe('selectCurrentPage', () => {
      it('should select current page', () => {
        const result = selectCurrentPage.projector(mockCollegeListState);
        expect(result).toBe(1);
      });
    });
  
    describe('selectPageSize', () => {
      it('should select page size', () => {
        const result = selectPageSize.projector(mockCollegeListState);
        expect(result).toBe(3);
      });
    });
  
    describe('selectFilter', () => {
      it('should select filter value', () => {
        const result = selectFilter.projector(mockCollegeListState);
        expect(result).toBe('');
      });
  
      it('should select filter value when set', () => {
        mockCollegeListState.filter = 'harvard';
        const result = selectFilter.projector(mockCollegeListState);
        expect(result).toBe('harvard');
      });
    });
  
    describe('selectFilteredColleges', () => {
      it('should return all colleges when no filter', () => {
        const colleges = mockCollegeListState.colleges;
        const filter = '';
        const result = selectFilteredColleges.projector(colleges, filter);
        expect(result).toEqual(colleges);
      });
  
      it('should filter colleges by name', () => {
        const colleges = mockCollegeListState.colleges;
        const filter = 'harvard';
        const result = selectFilteredColleges.projector(colleges, filter);
        expect(result).toEqual([
          { id: 1, name: 'Harvard University', city: 'Boston', state: 'MA', numStudents: 23016, tuitionAndFees: 54269, numMajors: 50, hasSports: true }
        ]);
      });
  
      it('should filter colleges case insensitively', () => {
        const colleges = mockCollegeListState.colleges;
        const filter = 'STANFORD';
        const result = selectFilteredColleges.projector(colleges, filter);
        expect(result).toEqual([
          { id: 3, name: 'Stanford University', city: 'Stanford', state: 'CA', numStudents: 17249, tuitionAndFees: 56169, numMajors: 65, hasSports: true }
        ]);
      });
  
      it('should return multiple matches', () => {
        const colleges = mockCollegeListState.colleges;
        const filter = 'university';
        const result = selectFilteredColleges.projector(colleges, filter);
        expect(result).toEqual([
          { id: 1, name: 'Harvard University', city: 'Boston', state: 'MA', numStudents: 23016, tuitionAndFees: 54269, numMajors: 50, hasSports: true },
          { id: 3, name: 'Stanford University', city: 'Stanford', state: 'CA', numStudents: 17249, tuitionAndFees: 56169, numMajors: 65, hasSports: true },
          { id: 4, name: 'Yale University', city: 'New Haven', state: 'CT', numStudents: 13609, tuitionAndFees: 59950, numMajors: 80, hasSports: true },
          { id: 5, name: 'Princeton University', city: 'Princeton', state: 'NJ', numStudents: 5426, tuitionAndFees: 56010, numMajors: 37, hasSports: false }
        ]);
      });
    });
  
    describe('selectSortBy', () => {
      it('should select sort by field', () => {
        const result = selectSortBy.projector(mockCollegeListState);
        expect(result).toBe('name');
      });
    });
  
    describe('selectSortDirection', () => {
      it('should select sort direction', () => {
        const result = selectSortDirection.projector(mockCollegeListState);
        expect(result).toBe('asc');
      });
    });
  
    describe('selectFilteredSortedColleges', () => {
      it('should sort colleges by name ascending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'name';
        const sortDirection = 'asc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].name).toBe('Harvard University');
        expect(result[1].name).toBe('MIT');
        expect(result[2].name).toBe('Princeton University');
        expect(result[3].name).toBe('Stanford University');
        expect(result[4].name).toBe('Yale University');
      });
  
      it('should sort colleges by name descending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'name';
        const sortDirection = 'desc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].name).toBe('Yale University');
        expect(result[1].name).toBe('Stanford University');
        expect(result[2].name).toBe('Princeton University');
        expect(result[3].name).toBe('MIT');
        expect(result[4].name).toBe('Harvard University');
      });
  
      it('should sort colleges by ranking ascending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'numStudents';
        const sortDirection = 'asc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].numStudents).toBe(5426);
        expect(result[1].numStudents).toBe(11520);
        expect(result[2].numStudents).toBe(13609);
        expect(result[3].numStudents).toBe(17249);
        expect(result[4].numStudents).toBe(23016);
      });
  
      it('should sort colleges by ranking descending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'numStudents';
        const sortDirection = 'desc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].numStudents).toBe(23016);
        expect(result[1].numStudents).toBe(17249);
        expect(result[2].numStudents).toBe(13609);
        expect(result[3].numStudents).toBe(11520);
        expect(result[4].numStudents).toBe(5426);
      });
  
      it('should sort colleges by location ascending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'city';
        const sortDirection = 'asc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].city).toBe('Boston');
        expect(result[1].city).toBe('Cambridge');
        expect(result[2].city).toBe('New Haven');
        expect(result[3].city).toBe('Princeton');
        expect(result[4].city).toBe('Stanford');
      });
  
      it('should sort colleges by tuition and fees descending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'tuitionAndFees';
        const sortDirection = 'desc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].tuitionAndFees).toBe(59950);
        expect(result[1].tuitionAndFees).toBe(56169);
        expect(result[2].tuitionAndFees).toBe(56010);
        expect(result[3].tuitionAndFees).toBe(54269);
        expect(result[4].tuitionAndFees).toBe(53818);
      });
  
      it('should sort colleges by state ascending', () => {
        const colleges = mockCollegeListState.colleges;
        const sortBy = 'state';
        const sortDirection = 'asc';
        const result = selectFilteredSortedColleges.projector(colleges, sortBy, sortDirection);
        expect(result[0].state).toBe('CA');
        expect(result[1].state).toBe('CT');
        expect(result[2].state).toBe('MA');
        expect(result[3].state).toBe('MA');
        expect(result[4].state).toBe('NJ');
      });
    });
  
    describe('selectPaginatedColleges', () => {
      it('should return first page of colleges', () => {
        const colleges = mockCollegeListState.colleges;
        const currentPage = 1;
        const pageSize = 3;
        const result = selectPaginatedColleges.projector(colleges, currentPage, pageSize);
        expect(result.length).toBe(3);
        expect(result).toEqual([
          { id: 1, name: 'Harvard University', city: 'Boston', state: 'MA', numStudents: 23016, tuitionAndFees: 54269, numMajors: 50, hasSports: true },
          { id: 2, name: 'MIT', city: 'Cambridge', state: 'MA', numStudents: 11520, tuitionAndFees: 53818, numMajors: 30, hasSports: true },
          { id: 3, name: 'Stanford University', city: 'Stanford', state: 'CA', numStudents: 17249, tuitionAndFees: 56169, numMajors: 65, hasSports: true }
        ]);
      });
  
      it('should return second page of colleges', () => {
        const colleges = mockCollegeListState.colleges;
        const currentPage = 2;
        const pageSize = 3;
        const result = selectPaginatedColleges.projector(colleges, currentPage, pageSize);
        expect(result.length).toBe(2);
        expect(result).toEqual([
          { id: 4, name: 'Yale University', city: 'New Haven', state: 'CT', numStudents: 13609, tuitionAndFees: 59950, numMajors: 80, hasSports: true },
          { id: 5, name: 'Princeton University', city: 'Princeton', state: 'NJ', numStudents: 5426, tuitionAndFees: 56010, numMajors: 37, hasSports: false }
        ]);
      });
  
      it('should return correct page with different page size', () => {
        const colleges = mockCollegeListState.colleges;
        const currentPage = 1;
        const pageSize = 2;
        const result = selectPaginatedColleges.projector(colleges, currentPage, pageSize);
        expect(result.length).toBe(2);
        expect(result).toEqual([
          { id: 1, name: 'Harvard University', city: 'Boston', state: 'MA', numStudents: 23016, tuitionAndFees: 54269, numMajors: 50, hasSports: true },
          { id: 2, name: 'MIT', city: 'Cambridge', state: 'MA', numStudents: 11520, tuitionAndFees: 53818, numMajors: 30, hasSports: true }
        ]);
      });
  
      it('should return third page with page size 2', () => {
        const colleges = mockCollegeListState.colleges;
        const currentPage = 3;
        const pageSize = 2;
        const result = selectPaginatedColleges.projector(colleges, currentPage, pageSize);
        expect(result.length).toBe(1);
        expect(result).toEqual([
          { id: 5, name: 'Princeton University', city: 'Princeton', state: 'NJ', numStudents: 5426, tuitionAndFees: 56010, numMajors: 37, hasSports: false }
        ]);
      });
    });
  
    describe('Search Selectors Integration Test', () => {
      it('should work with filtering, sorting, and pagination together', () => {
        const colleges = [
          { id: 1, name: 'Harvard University', city: 'Boston', state: 'MA', numStudents: 23016, tuitionAndFees: 54269, numMajors: 50, hasSports: true },
          { id: 2, name: 'MIT', city: 'Cambridge', state: 'MA', numStudents: 11520, tuitionAndFees: 53818, numMajors: 30, hasSports: true },
          { id: 3, name: 'Stanford University', city: 'Stanford', state: 'CA', numStudents: 17249, tuitionAndFees: 56169, numMajors: 65, hasSports: true },
          { id: 4, name: 'Yale University', city: 'New Haven', state: 'CT', numStudents: 13609, tuitionAndFees: 59950, numMajors: 80, hasSports: true }
        ];
        
        // Filter for "university"
        const filter = 'university';
        const filteredColleges = selectFilteredColleges.projector(colleges, filter);
        expect(filteredColleges.length).toBe(3);
        
        // Sort by name descending
        const sortBy = 'name';
        const sortDirection = 'desc';
        const sortedColleges = selectFilteredSortedColleges.projector(filteredColleges, sortBy, sortDirection);
        expect(sortedColleges[0].name).toBe('Yale University');
        expect(sortedColleges[1].name).toBe('Stanford University');
        
        // Paginate - first page with page size 2
        const currentPage = 1;
        const pageSize = 2;
        const paginatedColleges = selectPaginatedColleges.projector(sortedColleges, currentPage, pageSize);
        expect(paginatedColleges.length).toBe(2);
        expect(paginatedColleges[0].name).toBe('Yale University');
        expect(paginatedColleges[1].name).toBe('Stanford University');
      });
    });
  });