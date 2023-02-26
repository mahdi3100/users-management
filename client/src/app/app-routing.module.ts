import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {RegisterComponent } from "./register/register.component"
import { AuthGuard} from "./auth.guard";
const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'profile/:firstname', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'home', component: HomeComponent ,canActivate:[AuthGuard]},
 
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
