import { Component } from "@angular/core";
import { UserForm } from "./user-form/userForm";
import { UserService } from "./services/userService";
import { User } from "./User";

@Component({
  selector: "user-page",
  imports: [UserForm],
  template: `
    <div>
      <h2>User page</h2>
      <button (click)="loadUsers()">Get Users</button>
      @for (user of users; track user.id) {
      <ul>
        {{
          user.username
        }}
      </ul>
      }
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
  users: User[] = [];

  constructor(private userService: UserService) {}

  toggleDisplayUserForm(): void {
    this.displayUserForm = !this.displayUserForm;
  }

  loadUsers() {
    console.log("clicked");
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        console.log("Users loaded successfully:", this.users);
      },
      error: (err: Error) => {
        console.error("Error loading users:", err);
      },
      complete: () => {
        console.log("User fetching complete.");
      },
    });
  }
}
