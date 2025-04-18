import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Required for Toastr
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center', 
      timeOut: 1500, 
      closeButton: true,
      enableHtml: true
      // progressBar: true
    }),]
};
