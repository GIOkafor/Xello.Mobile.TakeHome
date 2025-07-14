import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollegeListComponent } from './college-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import * as CollegeListActions from './college-list.actions';
import * as CollegeListSelectors from './college-list.selectors';
import { College } from './college-list.model';

describe('CollegeListComponent', () => {
  let component: CollegeListComponent;
  let fixture: ComponentFixture<CollegeListComponent>;
  let store: MockStore;
  let router: Router;

  const mockColleges: College[] = [
    { id: 1, name: 'Test College', city: '', state: '', numStudents: 0, tuitionAndFees: 0, numMajors: 0, hasSports: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeListComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: CollegeListSelectors.selectColleges, value: mockColleges },
            { selector: CollegeListSelectors.selectListLoading, value: false },
            { selector: CollegeListSelectors.selectNavigating, value: false },
            { selector: CollegeListSelectors.selectCollegesError, value: null },
            { selector: CollegeListSelectors.selectPaginatedColleges, value: mockColleges },
            { selector: CollegeListSelectors.selectCurrentPage, value: 1 },
            { selector: CollegeListSelectors.selectPageSize, value: 10 },
            { selector: CollegeListSelectors.selectFilteredSortedColleges, value: mockColleges },
            { selector: CollegeListSelectors.selectSortBy, value: 'id' },
            { selector: CollegeListSelectors.selectSortDirection, value: 'asc' }
          ]
        }),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CollegeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadColleges on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.loadColleges());
  });

  it('should dispatch setNavigating and navigate on row click', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const college = mockColleges[0];
    component.onRowClick(college);
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.setNavigating({ navigating: true }));
    expect(router.navigate).toHaveBeenCalledWith(['/college', college.id]);
  });

  it('should dispatch resetFilters and loadColleges on refresh', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.refreshCollegeList();
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.resetFilters());
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.loadColleges());
  });

  it('should track by college id', () => {
    const college = mockColleges[0];
    expect(component.trackById(0, college)).toBe(college.id);
  });

  it('should dispatch setPage on page change', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onPageChange(2);
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.setPage({ page: 2 }));
  });

  it('should dispatch setPageSize on page size change', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onPageSizeChange(25);
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.setPageSize({ pageSize: 25 }));
  });

  it('should dispatch setFilter on filter change', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onFilterChange('test');
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.setFilter({ filter: 'test' }));
  });

  it('getSortIndicator should emit correct indicator', (done) => {
    component.getSortIndicator('id').subscribe(indicator => {
      expect(indicator).toBe('↑');
      done();
    });
  });
});