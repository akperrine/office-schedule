/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from "@angular/platform-browser";
import { App } from "./app/app";
import { appConfig } from "./app/app.config";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    appConfig.providers,
    provideProtractorTestingSupport(),
  ],
}).catch((err) => console.error(err));
