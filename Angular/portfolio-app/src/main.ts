import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core'; // Angular: Zone.js provider
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Angular: Enable Zone.js with optimization
    provideRouter(routes)
  ]
}).catch(err => console.error('❌ Bootstrap failed:', err));