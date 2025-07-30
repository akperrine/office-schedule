import { Component } from "@angular/core";
import { Scheduler } from "./scheduler/scheduler";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  // imports: [Scheduler],
  imports: [RouterOutlet],
  template: ` <main>
    <div class="nav-bar-container">
      <header class="brand-name">
        <img
          class="brand-logo"
          src="/assets/logo.svg"
          alt="logo"
          aria-hidden="true"
        />
      </header>
      <nav>
        <a routerLink="/user-profile">User profile</a>
        <a routerLink="/settings">Settings</a>
      </nav>
    </div>
    <!-- <app-scheduler></app-scheduler>
    <section class="content"></section> -->
    <router-outlet></router-outlet>
  </main>`,
  styleUrls: ["./app.css"],
})
export class App {
  title = "scheduler-app";
  constructor(private router: Router) {}
}
