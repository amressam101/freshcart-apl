import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2";

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { unauthorizedInterceptor } from './core/interceptors/unauthorized/unauthorized-interceptor';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSweetAlert2({
      // Optional configuration
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
    importProvidersFrom(NgxSpinnerModule),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, unauthorizedInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }), withViewTransitions()), provideClientHydration(withEventReplay())
  ]
};
