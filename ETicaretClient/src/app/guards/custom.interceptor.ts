import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('accessToken')
  const clonereq=req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })

  return next(clonereq);

};
