import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkerComponent } from './gt-worker.component';

describe('GtWorkerComponent', () => {
  let component: GtWorkerComponent;
  let fixture: ComponentFixture<GtWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
