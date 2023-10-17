import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './dash/service/auth.service'; // Supposons que vous avez un service d'authentification
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAllowed()==true) { // Utilisez la méthode appropriée pour vérifier l'authentification de l'utilisateur
      return true;
    } else {
      // Redirigez l'utilisateur vers une page de connexion ou affichez un message d'erreur
      // Exemple : 
      return this.router.navigate(['auth/login']);
      //return false;
    }
  }
}
