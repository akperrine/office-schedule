import { Component } from "@angular/core";
import { Scheduler } from "./scheduler/scheduler";

@Component({
  selector: "app-root",
  imports: [Scheduler],
  template: ` <main>
    <header class="brand-name">
      <img
        class="brand-logo"
        src="/assets/logo.svg"
        alt="logo"
        aria-hidden="true"
      />
    </header>
    <app-scheduler></app-scheduler>
    <section class="content"></section>
  </main>`,
  styleUrls: ["./app.css"],
})
export class App {
  title = "scheduler-app";
}
