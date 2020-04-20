import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulingAppointmentComponent } from './sheduling-appointment.component';

describe('ShedulingAppointmentComponent', () => {
  let component: ShedulingAppointmentComponent;
  let fixture: ComponentFixture<ShedulingAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedulingAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
