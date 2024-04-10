import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('isLogin')) {
    return true
  }
  else {
    Swal.fire({
      title: " You must login  !",
      icon: 'warning',
      confirmButtonText: 'Confirm'

    })
    return false;
  }
};
