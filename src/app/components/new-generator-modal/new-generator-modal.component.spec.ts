import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeneratorModalComponent } from './new-generator-modal.component';

describe('NewGeneratorModalComponent', () => {
  let component: NewGeneratorModalComponent;
  let fixture: ComponentFixture<NewGeneratorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGeneratorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGeneratorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
