import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StempelnComponent } from './stempeln.component';

describe('StempelnComponent', () => {
  let component: StempelnComponent;
  let fixture: ComponentFixture<StempelnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StempelnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StempelnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
