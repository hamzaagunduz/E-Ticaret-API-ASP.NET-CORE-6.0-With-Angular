
import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { customInterceptor } from './custom.interceptor';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/ui/custom-toastr.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
console.log("dasdas");

  const toastrService = inject(CustomToastrService);

 return next(req).pipe(
    catchError((err: any) => {

      switch(err.status){
        case HttpStatusCode.Unauthorized:
          toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break;

        case HttpStatusCode.InternalServerError:
          toastrService.message("inter", "inter", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break;

        case HttpStatusCode.BadRequest:
          toastrService.message("bad!", "bad!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          break;

          case HttpStatusCode.NotFound:
            toastrService.message("bad!", "bad!", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight
            });
            break;
          default:
            toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
            break;
      }
debugger
      // Re-throw the error to propagate it further
      return of(err);
    })
  );;
};
