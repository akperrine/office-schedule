import { ComponentFixture, TestBed } from "@angular/core/testing";
import { App } from "./app";

describe("App Tests", () => {
  let appComponent = App;
  let fixture = ComponentFixture<App>;
  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   declarations: [App],
    // }).compileComponents();
    // fixture = TestBed.createComponent(App);
    // appComponent = fixture.com;
    // fixture.detectChanges();
  });

  it("should verify that true == true", () => {
    expect(true).toBe(true);
  });

  //   it("should create app", (app) => {
  //     expect(appComponent).toBeTruthy();
  //   });
});
