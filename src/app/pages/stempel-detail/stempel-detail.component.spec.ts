import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StempelDetailComponent } from './stempel-detail.component';

describe('StempelDetailComponent', () => {
  let component: StempelDetailComponent;
  let fixture: ComponentFixture<StempelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StempelDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StempelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
