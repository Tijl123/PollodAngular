import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UitnodigenComponent } from './uitnodigen.component';

describe('UitnodigenComponent', () => {
  let component: UitnodigenComponent;
  let fixture: ComponentFixture<UitnodigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UitnodigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UitnodigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
