import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageActionsComponent } from './page-actions.component';

describe('PageActionsComponent', () => {
  let component: PageActionsComponent;
  let fixture: ComponentFixture<PageActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
