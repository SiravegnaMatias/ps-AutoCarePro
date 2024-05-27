import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  
  return  loginService.isLogged() ? true : inject(Router).createUrlTree(['/login']);
  };

