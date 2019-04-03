import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCsomorComponent } from './export-csomor.component';

describe('ExportCsomorComponent', () => {
  let component: ExportCsomorComponent;
  let fixture: ComponentFixture<ExportCsomorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCsomorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCsomorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
