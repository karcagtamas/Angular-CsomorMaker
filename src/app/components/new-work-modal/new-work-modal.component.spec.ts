import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkModalComponent } from './new-work-modal.component';

describe('NewWorkModalComponent', () => {
  let component: NewWorkModalComponent;
  let fixture: ComponentFixture<NewWorkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
