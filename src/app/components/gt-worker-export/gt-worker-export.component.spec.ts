import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkerExportComponent } from './gt-worker-export.component';

describe('GtWorkerExportComponent', () => {
  let component: GtWorkerExportComponent;
  let fixture: ComponentFixture<GtWorkerExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkerExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkerExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
