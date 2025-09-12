import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { UserService } from "./userService";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import { provideZonelessChangeDetection } from "@angular/core";
import "zone.js";

const MOCK_USERS = [
  { id: 1, username: "Alice", email: "alice@test.com" },
  { id: 2, username: "Bob", email: "bob@test.com" },
];

describe("User Service", async () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it("should get users", async () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    let userService = TestBed.inject(UserService);
    const users = userService.getUsers();
    const userPromise = firstValueFrom(users);
    const req = httpTesting.expectOne(
      "http://127.0.0.1:5000/users",
      "Request to load users"
    );
    req.flush(MOCK_USERS);
    expect(await userPromise).toEqual(MOCK_USERS);
  });

  it("should add a user", async () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    let userService = TestBed.inject(UserService);
    const user = userService.addUser(MOCK_USERS[0]);
    const userPromise = firstValueFrom(user);
    const req = httpTesting.expectOne(
      "http://127.0.0.1:5000/users",
      "Request to load users"
    );
    req.flush(MOCK_USERS[0]);
    expect(await userPromise).toEqual(MOCK_USERS[0]);
  });

  it("should update a user", async () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    let userService = TestBed.inject(UserService);
    let mockUpateUser = MOCK_USERS[0];
    mockUpateUser.username = "tester";
    const user = userService.updateUser(mockUpateUser, mockUpateUser.id);
    const userPromise = firstValueFrom(user);
    const req = httpTesting.expectOne(
      `http://127.0.0.1:5000/users/${mockUpateUser.id}`,
      "Request to load users"
    );
    req.flush(mockUpateUser);
    expect(await userPromise).toEqual(mockUpateUser);
    expect((await userPromise).username).toEqual("tester");
  });
});
