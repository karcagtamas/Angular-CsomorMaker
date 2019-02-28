import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortaComponent } from './porta.component';

describe('PortaComponent', () => {
  let component: PortaComponent;
  let fixture: ComponentFixture<PortaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
