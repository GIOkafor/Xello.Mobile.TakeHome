import { Routes } from '@angular/router';
import { CollegeListComponent } from './college-list/college-list.component';
import { CollegeDetailsComponent } from './college-details/college-details.component';
import { collegeListResolver } from './college-list/college-list.resolver';

export const routes: Routes = [
  { path: '', component: CollegeListComponent },
  { path: 'college/:id', component: CollegeDetailsComponent, resolve: { collegesLoaded: collegeListResolver } },
];
