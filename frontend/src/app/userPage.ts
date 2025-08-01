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
        <div>{{ user.username }}</div>
        <button (click)="toggleEditForm(user.id)">Edit</button>
      </ul>
      }
      <div>There will be crud options here soon</div>
      <button (click)="toggleDisplayUserForm()">Add User</button>
      @if (displayUserForm) {
      <user-form [userId]="selectedUserId"></user-form>
      }
    </div>
  `,
})
export class UserPage {
  displayUserForm = false;
  selectedUserId: number | null = null;
  users: User[] = [];

  constructor(private userService: UserService) {}

  toggleDisplayUserForm(): void {
    this.displayUserForm = !this.displayUserForm;
  }

  toggleEditForm(userId: number) {
    this.selectedUserId = userId;
    this.displayUserForm = !this.displayUserForm;
    console.log("from userPage ", userId);
  }

  loadUsers() {
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
