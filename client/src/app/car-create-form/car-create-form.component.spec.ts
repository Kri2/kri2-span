import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCreateFormComponent } from './car-create-form.component';

describe('CarCreateFormComponent', () => {
  let component: CarCreateFormComponent;
  let fixture: ComponentFixture<CarCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
