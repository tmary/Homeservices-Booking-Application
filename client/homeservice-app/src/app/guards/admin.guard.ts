import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserRole } from '../shared/user-role.enum';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | boolean {
      const role = this.authService.getCurrentUserRole();
          if (role === UserRole.Admin) {
            return true;
          } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
    }

  }

