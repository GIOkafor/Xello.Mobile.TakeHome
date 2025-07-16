import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollegeDetailsSkeletonComponent } from './college-details-skeleton.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CollegeDetailsSkeletonComponent', () => {
  let component: CollegeDetailsSkeletonComponent;
  let fixture: ComponentFixture<CollegeDetailsSkeletonComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeDetailsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeDetailsSkeletonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the back button skeleton', () => {
    const backButtonSkeleton = debugElement.query(By.css('.mb-4 .placeholder.col-3.btn.btn-primary.disabled'));
    expect(backButtonSkeleton).toBeTruthy();
    expect(backButtonSkeleton.nativeElement.classList).toContain('placeholder');
    expect(backButtonSkeleton.nativeElement.classList).toContain('col-3');
    expect(backButtonSkeleton.nativeElement.classList).toContain('btn');
    expect(backButtonSkeleton.nativeElement.classList).toContain('btn-primary');
    expect(backButtonSkeleton.nativeElement.classList).toContain('disabled');
  });

  it('should render the card skeleton with correct structure', () => {
    const cardElement = debugElement.query(By.css('.card.p-3'));
    expect(cardElement).toBeTruthy();
    expect(cardElement.nativeElement.classList).toContain('card');
    expect(cardElement.nativeElement.classList).toContain('p-3');
  });

  it('should render all placeholder elements with placeholder-glow class', () => {
    const placeholderGlowElements = debugElement.queryAll(By.css('.placeholder-glow'));
    expect(placeholderGlowElements.length).toBe(7);
    
    placeholderGlowElements.forEach(element => {
      expect(element.nativeElement.classList).toContain('placeholder-glow');
      expect(element.nativeElement.classList).toContain('mb-2');
    });
  });

  it('should not have any interactive elements', () => {
    const interactiveElements = debugElement.queryAll(By.css('button, input, select, textarea, a:not(.disabled)'));
    expect(interactiveElements.length).toBe(0);
  });

  it('should have proper accessibility attributes', () => {
    const disabledButton = debugElement.query(By.css('.btn.disabled'));
    expect(disabledButton).toBeTruthy();
    expect(disabledButton.nativeElement.classList).toContain('disabled');
  });
})