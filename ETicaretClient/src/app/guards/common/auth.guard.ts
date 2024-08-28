import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/common/auth.service';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(CustomToastrService);
  const spinner = inject(NgxSpinnerService);

  spinner.show(SpinnerType.BallAtom);

  authService.identityCheck(); // Güncelleyici fonksiyonu çağır

  if (!authService.isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }

  spinner.hide(SpinnerType.BallAtom);

  return authService.isAuthenticated; // Kullanıcıyı yönlendir
};
