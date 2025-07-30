import { Component, EventEmitter, Output } from "@angular/core";
import { User } from "../User";
import { CommonModule } from "@angular/common";
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
      <h3>Add New User</h3>
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
            Add User
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

  userForm = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userAdded.emit(this.userForm.value as User);
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
