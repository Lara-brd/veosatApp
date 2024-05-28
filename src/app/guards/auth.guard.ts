import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

// Debido a la versión 16 los guards ahora no se utilizan con una clase
// No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing

const checkAuthStatus = ():boolean => {
    //Inyección de dependencias con inject
    const authService = inject(AuthService);
    const router = inject(Router);

    if(!authService.authSuccess){router.navigateByUrl('/auth/login')}
    return authService.authSuccess;
}

export const authGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = ( ) => {
  return checkAuthStatus();
};
