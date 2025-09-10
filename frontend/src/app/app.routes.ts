import { Routes } from "@angular/router";
import { Scheduler } from "./scheduler/scheduler";
import { UserPage } from "./user-page/userPage";
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
