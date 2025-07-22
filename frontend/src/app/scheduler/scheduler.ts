import { Component, OnInit } from "@angular/core";
import { AppointmentInfo } from "../AppointmentInfo";
import { ScheduleBlock } from "../schedule-block/scheduleBlock";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import "./scheduler.css";
import { ScheduleDay } from "../scheduler-day/schedulerDay";

@Component({
  selector: "app-scheduler",
  imports: [CommonModule, ScheduleDay],
  template: `
    <section>
      <h2>Appointments</h2>
      <div class="schedule-block-container">
        <scheduler-day
          *ngFor="let day of daysOfWeek"
          [dayName]="day"
          [appointments]="weeklyAppointments[day]"
        ></scheduler-day>
      </div>
    </section>
  `,
  styleUrls: ["./scheduler.css"],
})
export class Scheduler implements OnInit {
  // appointments: AppointmentInfo[] = [];
  weeklyAppointments: { [key: string]: AppointmentInfo[] } = {};
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
    //    this.daysOfWeek.forEach(day => {
    //   this.weeklyAppointments[day] = [];
    // });
    this.daysOfWeek.forEach((day) => {
      this.weeklyAppointments[day] = [];
    });

    const mockAppointments = [
      {
        id: this.nextId++,
        day: "Monday",
        time: "09:00 AM",
        title: "Team Stand-up",
        description: "Daily sync meeting",
      },
      {
        id: this.nextId++,
        day: "Monday",
        time: "10:00 AM",
        title: "Break out Room",
        description: "Follow-up meeting",
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

    // allAppointments.forEach(appt => {
    //   if (this.weeklyAppointments[appt.day]) {
    //     this.weeklyAppointments[appt.day].push(appt);
    //   }
    // });
    mockAppointments.forEach((appt) => {
      if (this.weeklyAppointments[appt.day]) {
        this.weeklyAppointments[appt.day].push(appt);
      }
    });
  }
}
