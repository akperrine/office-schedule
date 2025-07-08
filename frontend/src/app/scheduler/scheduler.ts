import { Component, OnInit } from "@angular/core";
import { AppointmentInfo } from "../AppointmentInfo";
import { ScheduleBlock } from "../schedule-block/schedule-block";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-scheduler",
  imports: [ScheduleBlock, CommonModule],
  template: `
    <section>
      <h2>Appointments</h2>
      <schedule-block
        *ngFor="let schBlock of appointments"
        [block]="schBlock"
      ></schedule-block>
    </section>
  `,
  styles: ``,
})
export class Scheduler implements OnInit {
  appointments: AppointmentInfo[] = [];
  daysOfWeek: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  appointmentForm: FormGroup;
  nextId: number = 1;

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values and validation rules
    this.appointmentForm = this.fb.group({
      day: ["", Validators.required],
      time: ["", Validators.required],
      title: ["", Validators.required],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.loadMockAppointments();
  }

  loadMockAppointments(): void {
    this.appointments = [
      {
        id: this.nextId++,
        day: "Monday",
        time: "09:00 AM",
        title: "Team Stand-up",
        description: "Daily sync meeting",
      },
      {
        id: this.nextId++,
        day: "Tuesday",
        time: "10:30 AM",
        title: "Client Demo",
        description: "Present new features",
      },
      {
        id: this.nextId++,
        day: "Wednesday",
        time: "02:00 PM",
        title: "Project Planning",
        description: "Sprint 3 planning",
      },
      {
        id: this.nextId++,
        day: "Friday",
        time: "11:00 AM",
        title: "Code Review",
        description: "Review pull requests",
      },
      {
        id: this.nextId++,
        day: "Saturday",
        time: "04:00 PM",
        title: "Personal Appointment",
        description: "Dentist check-up",
      },
    ];
  }
}
