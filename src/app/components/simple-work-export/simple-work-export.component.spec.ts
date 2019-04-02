import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWorkExportComponent } from './simple-work-export.component';

describe('SimpleWorkExportComponent', () => {
  let component: SimpleWorkExportComponent;
  let fixture: ComponentFixture<SimpleWorkExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleWorkExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWorkExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
