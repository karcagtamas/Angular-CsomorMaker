import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPaysComponent } from './add-new-pays.component';

describe('AddNewPaysComponent', () => {
  let component: AddNewPaysComponent;
  let fixture: ComponentFixture<AddNewPaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
