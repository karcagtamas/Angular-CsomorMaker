import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkExportComponent } from './gt-work-export.component';

describe('GtWorkExportComponent', () => {
  let component: GtWorkExportComponent;
  let fixture: ComponentFixture<GtWorkExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
