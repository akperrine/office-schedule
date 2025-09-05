import { Component } from "@angular/core";
import { Scheduler } from "./scheduler/scheduler";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  // imports: [Scheduler],
  imports: [RouterOutlet, RouterLink],
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
        <a routerLink="/">Home</a>
        <a routerLink="/users" routerLinkActive="active">Users</a>
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
