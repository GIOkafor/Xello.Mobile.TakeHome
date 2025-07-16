import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, ReplaySubject } from 'rxjs';
import { CollegeListEffects } from './college-list.effects';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as CollegeListActions from './college-list.actions';
import { Action } from '@ngrx/store';
import { College } from './college-list.model';

describe('CollegeListEffects', () => {
  let actions$: Observable<Action>;
  let effects: CollegeListEffects;
  let httpMock: HttpTestingController;
  let actionsSubject: ReplaySubject<Action>;

  beforeEach(() => {
    actionsSubject = new ReplaySubject<Action>(1);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CollegeListEffects,
        provideMockActions(() => actionsSubject.asObservable())
      ]
    });

    effects = TestBed.inject(CollegeListEffects);
    httpMock = TestBed.inject(HttpTestingController);
    actions$ = actionsSubject.asObservable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should dispatch loadCollegesSuccess on successful load', (done) => {
    const mockColleges: College[] = [{ id: 1, name: 'Test College', city: '', state: '', numStudents: 0, tuitionAndFees: 0, numMajors: 0, hasSports: false }];
    actionsSubject.next(CollegeListActions.loadColleges());

    effects.loadColleges$.subscribe(action => {
      expect(action).toEqual(CollegeListActions.loadCollegesSuccess({ colleges: mockColleges }));
      done();
    });

    const req = httpMock.expectOne('assets/colleges.json');
    expect(req.request.method).toBe('GET');
    req.flush({ colleges: mockColleges });
  });

  it('should dispatch loadCollegesFailure on error', (done) => {
    const error = { status: 500, statusText: 'Server Error' };
    actionsSubject.next(CollegeListActions.loadColleges());

    effects.loadColleges$.subscribe(action => {
      expect(action.type).toBe(CollegeListActions.loadCollegesFailure.type);
      if (action.type === CollegeListActions.loadCollegesFailure.type) {
        expect(action.error.status).toBe(500);
      }
      done();
    });

    const req = httpMock.expectOne('assets/colleges.json');
    req.flush('Error', error);
  });
});