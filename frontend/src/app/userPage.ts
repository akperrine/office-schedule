import { Component } from "@angular/core";
import { UserForm } from "./user-form/userForm";

@Component({
  selector: "user-page",
  imports: [UserForm],
  template: `
    <div>
      <h2>User page</h2>
      <div>There will be crud options here soon</div>
      <button (click)="toggleDisplayUserForm()">Add User</button>
      @if (displayUserForm) {
      <user-form></user-form>
      }
    </div>
  `,
})
export class UserPage {
  displayUserForm = false;

  toggleDisplayUserForm(): void {
    this.displayUserForm = !this.displayUserForm;
  }
}
