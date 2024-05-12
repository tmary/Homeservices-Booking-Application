import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable} from '@angular/core';
import { map} from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
    /*if (this.authService.hasToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;*/
  }



}
