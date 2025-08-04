import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../User";
import { CommonModule } from "@angular/common";
import { UserService } from "../services/userService";
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "user-form",
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-form-container">
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            formControlName="username"
            class="form-control"
            [class.is-invalid]="
              userForm.get('username')?.invalid &&
              userForm.get('username')?.touched
            "
          />
          <div
            *ngIf="
              userForm.get('name')?.invalid && userForm.get('name')?.touched
            "
            class="invalid-feedback"
          >
            Name is required.
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            class="form-control"
            [class.is-invalid]="
              userForm.get('email')?.invalid && userForm.get('email')?.touched
            "
          />
          <div
            *ngIf="
              userForm.get('email')?.invalid && userForm.get('email')?.touched
            "
            class="invalid-feedback"
          >
            <span *ngIf="userForm.get('email')?.errors?.['required']"
              >Email is required.</span
            >
            <span *ngIf="userForm.get('email')?.errors?.['email']"
              >Please enter a valid email.</span
            >
          </div>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            [disabled]="userForm.invalid"
            class="btn btn-primary"
          >
            {{ userId ? "Edit User" : "Add User" }}
          </button>
          <button type="button" (click)="onCancel()" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: [],
})
export class UserForm {
  @Output() userAdded = new EventEmitter<User>();
  @Output() formCanceled = new EventEmitter<void>();
  @Input() userId: number | null = null;

  userForm = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService) {}

  addUserOnSubmit(user: User) {
    console.log(user.id, " vs ", this.userId);
    if (user.id !== null && user.id !== undefined) {
      throw `id ${user.id} cannot exist for new user`;
    }
    console.log("from user form add on sub", user.id);
    this.userService.addUser(user).subscribe({
      next: (res) => {
        console.log(res);
        this.userAdded.emit(res);
        this.userForm.reset();
      },
      error: (err: Error) => {
        console.error("Error loading users:", err);
      },
      complete: () => {
        console.log("User fetching complete.");
      },
    });
  }

  updateUserOnSubmit(user: User) {
    if (user.id === null) {
      throw "id cannot be null";
    }
    console.log("from user form ", user.id);
    this.userService.updateUser(user, user.id).subscribe({});
  }

  onSubmit(): void {
    console.log(this.userId, " this is the user id on submit");
    let userToUpdate = this.userForm.value as User;
    if (this.userForm.valid && this.userId) {
      userToUpdate.id = this.userId;
      this.updateUserOnSubmit(this.userForm.value as User);
      this.userId = null;
      this.userForm.reset();
    } else if (this.userForm.valid) {
      console.log(this.userId, " this is the user id on submit, inside");
      this.addUserOnSubmit(this.userForm.value as User);
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched;
    }
  }

  onCancel(): void {
    this.formCanceled.emit();
    this.userForm.reset();
  }
}
