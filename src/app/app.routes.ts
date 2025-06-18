import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'crear-tarea',
    loadComponent: () => import('./pages/crear-tarea/crear-tarea.page').then( m => m.CrearTareaPage)
  },
  {
    path: 'detalle-tarea/:id',
    loadComponent: () => import('./pages/detalle-tarea/detalle-tarea.page').then( m => m.DetalleTareaPage)
  },
];
