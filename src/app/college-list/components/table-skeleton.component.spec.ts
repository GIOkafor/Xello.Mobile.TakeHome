import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSkeletonComponent } from './table-skeleton.component';
import { By } from '@angular/platform-browser';

describe('TableSkeletonComponent', () => {
  let component: TableSkeletonComponent;
  let fixture: ComponentFixture<TableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 10 skeleton rows by default', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(10);
  });

  it('should render the number of skeleton rows specified by rowCount', () => {
    component.rowCount = 5;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(5);
  });

  it('should have table with class \"table\"', () => {
    const table = fixture.debugElement.query(By.css('table.table'));
    expect(table).toBeTruthy();
  });
})