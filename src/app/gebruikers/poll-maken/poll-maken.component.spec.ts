import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollMakenComponent } from './poll-maken.component';

describe('PollMakenComponent', () => {
  let component: PollMakenComponent;
  let fixture: ComponentFixture<PollMakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollMakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollMakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
