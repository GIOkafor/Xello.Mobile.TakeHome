import { Routes } from '@angular/router';
import { CollegeListComponent } from './college-list/college-list.component';
import { collegeListResolver } from './college-list/college-list.resolver';

export const routes: Routes = [
  { path: '', component: CollegeListComponent },
  { 
    path: 'college/:id',
    loadComponent: () => import('./college-details/college-details.component').then(m => m.CollegeDetailsComponent),
    resolve: { collegesLoaded: collegeListResolver } 
  },
];
