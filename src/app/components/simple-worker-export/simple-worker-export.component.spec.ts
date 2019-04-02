import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWorkerExportComponent } from './simple-worker-export.component';

describe('SimpleWorkerExportComponent', () => {
  let component: SimpleWorkerExportComponent;
  let fixture: ComponentFixture<SimpleWorkerExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleWorkerExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWorkerExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
