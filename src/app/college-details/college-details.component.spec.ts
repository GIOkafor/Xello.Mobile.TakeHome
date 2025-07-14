import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollegeDetailsComponent } from './college-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as CollegeListActions from '../college-list/college-list.actions';
import * as CollegeListSelectors from '../college-list/college-list.selectors';
import { College } from '../college-list/college-list.model';

describe('CollegeDetailsComponent', () => {
  let component: CollegeDetailsComponent;
  let fixture: ComponentFixture<CollegeDetailsComponent>;
  let store: MockStore;
  let router: Router;

  const mockColleges: College[] = [
    { id: 1, name: 'Test College', city: '', state: '', numStudents: 0, tuitionAndFees: 0, numMajors: 0, hasSports: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeDetailsComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: CollegeListSelectors.selectColleges, value: mockColleges }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => key === 'id' ? '1' : null
            })
          }
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CollegeDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the correct college based on route param', (done) => {
    component.college$.subscribe(college => {
      expect(college).toEqual(mockColleges[0]);
      done();
    });
  });

  it('should dispatch setNavigating(false) on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.setNavigating({ navigating: false }));
  });

  it('should navigate back to root on goBack()', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});