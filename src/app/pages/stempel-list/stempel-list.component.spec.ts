import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StempelListComponent } from './stempel-list.component';

describe('StempelListComponent', () => {
  let component: StempelListComponent;
  let fixture: ComponentFixture<StempelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StempelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StempelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
