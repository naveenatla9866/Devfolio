import { Routes } from '@angular/router';

export const routes: Routes = [
     {
    path: '', // Angular: Default route (empty path)
    redirectTo: 'home', // Angular: Redirect to home
    pathMatch: 'full' // Angular: Match entire URL
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home) // Angular: Lazy loading
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.Projects)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.Blog)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: '**', // Angular: Wildcard route for 404
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  }
];
