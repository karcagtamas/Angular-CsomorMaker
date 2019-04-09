import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtComponent } from './gt.component';

describe('GtComponent', () => {
  let component: GtComponent;
  let fixture: ComponentFixture<GtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
