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
        <button (click)="toggleEditForm(user)">Edit</button>
      </ul>
      } @if(displayEditForm) {
      <h3>Edit User</h3>
      <user-form
        [user]="selectedUser"
        (userSubmitted)="toggleEditForm(selectedUser)"
      ></user-form>
      }
      <button [disabled]="displayEditForm" (click)="toggleDisplayUserForm()">
        Add User
      </button>
      @if (displayUserForm) {
      <user-form (userSubmitted)="toggleDisplayUserForm()"></user-form>
      }
    </div>
  `,
})
export class UserPage {
  displayEditForm = false;
  displayUserForm = false;
  selectedUser: User | null = null;
  users: User[] = [];

  constructor(private userService: UserService) {}

  toggleDisplayUserForm(): void {
    this.displayUserForm = !this.displayUserForm;
  }

  toggleEditForm(clicked_user: User | null) {
    this.selectedUser = clicked_user;
    this.displayEditForm = !this.displayEditForm;
    console.log("from userPage ", this.selectedUser);
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
