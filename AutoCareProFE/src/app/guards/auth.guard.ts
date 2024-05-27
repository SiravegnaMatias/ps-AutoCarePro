import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { first, map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const userService = inject(UserService);
    const allowedRoles = route.data['allowedRoles'];
  
    const user = userService.getUserById(loginService.currentUserData.value.id);
  
    return user.pipe(
      first(),
      map(user => {
        if (allowedRoles.includes(user.role)) {
          return true;
        } else {
          return false;
        }
      })
    );
  };