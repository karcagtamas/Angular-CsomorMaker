import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkComponent } from './gt-work.component';

describe('GtWorkComponent', () => {
  let component: GtWorkComponent;
  let fixture: ComponentFixture<GtWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
