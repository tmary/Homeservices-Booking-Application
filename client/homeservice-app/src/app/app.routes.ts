import { NgModule , DoBootstrap} from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCardModule} from '@angular/material/card'
import { BrowserModule, bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { StarRatingModule } from 'angular-star-rating';


export const routes: Routes = [
  //{path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'homepage', loadComponent:() => import('./homepage/homepage.component').then((c) => c.HomepageComponent) },
  {path:'service-areas', loadComponent:() => import('./service-areas/service-areas.component').then((c) => c.ServiceAreasComponent)},
  {path:'login',loadComponent:()=> import('./login/login.component').then((c) => c.LoginComponent)},
  {path : 'signup',pathMatch:'full',loadComponent:()=> import('./registration/registration.component').then((c) => c.RegistrationComponent)},
  {path : 'booking', loadComponent:() => import('./booking/booking.component').then((c) =>c.BookingComponent),canActivate:[AuthGuard]},
  {path: 'service-list', loadComponent:()=> import ('./service-list/service-list.component').then((c)=>c.ServiceListComponent), canActivate:[AdminGuard] },
  {path:'users', pathMatch:'full', loadComponent:() => import('./users/users.component').then((c) =>c.UsersComponent), canActivate:[AdminGuard]},
  {path:'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then((c)=>c.DashboardComponent), canActivate:[AdminGuard]},
  {path:'rates', loadComponent: () => import('./rates/rates.component').then((c) => c.RatesComponent), canActivate:[AdminGuard]},
  {path:'promotions', loadComponent: () => import('./promotions/promotions.component').then((c) => c.PromotionsComponent)},
  {path:'feedback', loadComponent: () => import('./feedback/feedback.component').then((c) => c.FeedbackComponent)},
  {path:'booking-management', loadComponent: () => import('./booking-management/booking-management.component').then((c) => c.BookingManagementComponent), canActivate:[AdminGuard]},
  {path: 'homerepair', loadComponent:() => import('./homerepair/homerepair.component').then((c) => c.HomerepairComponent)},
  {path:'account-mgt', loadComponent: () => import('./account-mgt/account-mgt.component').then((c) => c.AccountMgtComponent), canActivate:[AdminGuard]},
  {path: '**', redirectTo:'/homepage'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes), NgbModule, MatFormFieldModule, MatInput,
    MatCardModule, BrowserModule, StarRatingModule
  ],
  exports: [RouterModule],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    },
  ]

})
export class AppRoutingModule {

}
