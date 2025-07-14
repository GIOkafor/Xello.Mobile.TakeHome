import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { runInInjectionContext } from '@angular/core';
import { firstValueFrom, of, from } from 'rxjs';

import { collegeListResolver } from './college-list.resolver';
import * as CollegeListActions from './college-list.actions';
import * as CollegeListSelectors from './college-list.selectors';

describe('CollegeListResolver', () => {
  let resolver: ResolveFn<boolean>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {}
        })
      ]
    });

    resolver = collegeListResolver;
    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should dispatch loadColleges action', async () => {
    store.overrideSelector(CollegeListSelectors.selectListLoading, false);
    
    await runInInjectionContext(TestBed.inject(TestBed), async () => {
      const result = resolver({} as any, {} as any);
      const observable = typeof result === 'boolean' ? of(result) : 
                        result instanceof Promise ? from(result) : result;
      await firstValueFrom(observable);
    });
    
    expect(dispatchSpy).toHaveBeenCalledWith(CollegeListActions.loadColleges());
  });

  it('should return false when loading is false', async () => {
    store.overrideSelector(CollegeListSelectors.selectListLoading, false);
    
    const result = await runInInjectionContext(TestBed.inject(TestBed), async () => {
      const resolverResult = resolver({} as any, {} as any);
      const observable = typeof resolverResult === 'boolean' ? of(resolverResult) : 
                        resolverResult instanceof Promise ? from(resolverResult) : resolverResult;
      return await firstValueFrom(observable);
    });
    
    expect(result).toBe(false);
  });

  it('should wait for loading to become false', async () => {
    store.overrideSelector(CollegeListSelectors.selectListLoading, true);
    
    const resolverPromise = runInInjectionContext(TestBed.inject(TestBed), async () => {
      const resolverResult = resolver({} as any, {} as any);
      const observable = typeof resolverResult === 'boolean' ? of(resolverResult) : 
                        resolverResult instanceof Promise ? from(resolverResult) : resolverResult;
      return firstValueFrom(observable);
    });
    
    setTimeout(() => {
      store.overrideSelector(CollegeListSelectors.selectListLoading, false);
      store.refreshState();
    }, 10);
    
    const result = await resolverPromise;
    expect(result).toBe(false);
  });
});