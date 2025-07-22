import { Component, Input } from "@angular/core";
import { AppointmentInfo } from "../AppointmentInfo";

@Component({
  selector: "schedule-block",
  imports: [],
  template: ` <section class="appointment-card">
    <div class="card-header">
      <h3 class="card-title">{{ appointment.title }}</h3>
      <div class="card-time-day">
        <span class="card-day">{{ appointment.day }}</span>
        <span class="card-time">{{ appointment.time }}</span>
      </div>
    </div>
    <div class="card-body">
      <p class="card-description">{{ appointment.description }}</p>
    </div>
  </section>`,
  styleUrls: ["./scheduleBlock.css"],
})
export class ScheduleBlock {
  @Input() appointment!: AppointmentInfo;
}
