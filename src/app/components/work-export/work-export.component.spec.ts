import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExportComponent } from './work-export.component';

describe('WorkExportComponent', () => {
  let component: WorkExportComponent;
  let fixture: ComponentFixture<WorkExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
