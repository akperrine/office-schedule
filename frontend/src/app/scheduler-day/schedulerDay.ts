// @for (item of items; track item.name) {
// <li>{{ item.name }}</li>
// } @empty {
// <li>There are no items.</li>
// }

import { Component, Input } from "@angular/core";
import { ScheduleBlock } from "../schedule-block/scheduleBlock";
import { AppointmentInfo } from "../AppointmentInfo";

@Component({
  selector: "scheduler-day",
  imports: [ScheduleBlock],
  template: `
    <div class="day-column">
      <h2 class="day-header">{{ dayName }}</h2>
      @for (appt of appointments; track appt.id) {
      <schedule-block [appointment]="appt"></schedule-block>
      } @empty {
      <div>There are no items.</div>
      }
    </div>
  `,
  styleUrls: ["./scheduleDay.css"],
})
export class ScheduleDay {
  @Input() dayName!: any;
  @Input() appointments: AppointmentInfo[] = [];
}
