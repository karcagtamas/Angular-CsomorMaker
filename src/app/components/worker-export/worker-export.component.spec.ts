import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerExportComponent } from './worker-export.component';

describe('WorkerExportComponent', () => {
  let component: WorkerExportComponent;
  let fixture: ComponentFixture<WorkerExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
