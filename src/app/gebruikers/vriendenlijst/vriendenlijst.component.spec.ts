import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VriendenlijstComponent } from './vriendenlijst.component';

describe('VriendenlijstComponent', () => {
  let component: VriendenlijstComponent;
  let fixture: ComponentFixture<VriendenlijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VriendenlijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VriendenlijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
