import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const sessiondata=sessionStorage.getItem('session');
 if(!sessiondata)
 {
  router.navigate(['/login']);
  return false;
 }

  return true;
};
