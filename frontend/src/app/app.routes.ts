import { Routes } from "@angular/router";
import { Scheduler } from "./scheduler/scheduler";
import { UserPage } from "./userPage";

export const routes: Routes = [
  {
    path: "",
    component: Scheduler,
  },
  {
    path: "users",
    component: UserPage,
  },
];
