import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', [], {
      url: '/' // default url
    });
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'xello-senior-web-dev-takehome-web' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('xello-senior-web-dev-takehome-web');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('College List');
  });

  it('should return "College Details" when URL contains "/college"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Mock router.url to contain '/college'
    Object.defineProperty(mockRouter, 'url', {
      get: () => '/college/123'
    });
    
    expect(app.pageTitle).toBe('College Details');
  });

  it('should return "College List" when URL does not contain "/college"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Mock router.url to not contain '/college'
    Object.defineProperty(mockRouter, 'url', {
      get: () => '/dashboard'
    });
    
    expect(app.pageTitle).toBe('College List');
  });

  it('should return "College List" for root URL', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Mock router.url for root
    Object.defineProperty(mockRouter, 'url', {
      get: () => '/'
    });
    
    expect(app.pageTitle).toBe('College List');
  });
});
