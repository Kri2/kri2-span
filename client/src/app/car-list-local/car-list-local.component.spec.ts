import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListLocalComponent } from './car-list-local.component';

describe('CarListLocalComponent', () => {
  let component: CarListLocalComponent;
  let fixture: ComponentFixture<CarListLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarListLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
