import { Component, Input } from "@angular/core";
import { AppointmentInfo } from "../AppointmentInfo";

@Component({
  selector: "schedule-block",
  imports: [],
  template: `<section>{{ block.day }}</section>`,
  styles: ``,
})
export class ScheduleBlock {
  @Input() block!: AppointmentInfo;
}
