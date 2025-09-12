import {
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { UserPage } from "./userPage";
import {
  ChangeDetectorRef,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { User } from "../User";
import "zone.js";

describe("User Page tests", () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        // provideZonelessChangeDetection(),
        provideRouter([{ path: "users", component: UserPage }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [UserPage],
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  it("should have an empty users array initially", () => {
    expect(component.users).toEqual([]);
  });

  it("should not display the user form or edit form initially", () => {
    expect(component.displayUserForm).toBeFalse();
    expect(component.displayEditForm).toBeFalse();
  });

  it('should render the "Add User" and "Get Users" buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".btn-get-users")?.textContent).toContain(
      "Get Users"
    );
  });

  it("should load users from the service and populate the list", async () => {
    const mockUsers: User[] = [
      { id: 1, username: "testuser1", email: "test1@mail.com" },
      { id: 2, username: "testuser2", email: "test2@mail.com" },
    ];

    component.loadUsers();

    const req = httpMock.expectOne(
      "http://127.0.0.1:5000/users",
      "Request to load users"
    );
    expect(req.request.method).toBe("GET");

    req.flush(mockUsers);
    fixture.detectChanges();

    expect(component.users.length).toBe(2);
    expect(component.users[0].username).toBe("testuser1");

    const compiled = fixture.nativeElement as HTMLElement;
    const userList = compiled.querySelectorAll(".user-list");
    console.log(userList.length);
    expect(userList.length).toBe(2);
    expect(userList[0].textContent).toContain("testuser1");
  });
});
