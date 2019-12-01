import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VriendenToevoegenComponent } from './vrienden-toevoegen.component';

describe('VriendenToevoegenComponent', () => {
  let component: VriendenToevoegenComponent;
  let fixture: ComponentFixture<VriendenToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VriendenToevoegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VriendenToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
