import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkerModalComponent } from './new-worker-modal.component';

describe('NewWorkerModalComponent', () => {
  let component: NewWorkerModalComponent;
  let fixture: ComponentFixture<NewWorkerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
