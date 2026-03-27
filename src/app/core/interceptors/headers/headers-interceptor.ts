import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // REQUEST 

  let platFormId = inject(PLATFORM_ID)

  if (isPlatformBrowser(platFormId)) {
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          token: `${localStorage.getItem('token')}`
        }
      })
    }
  }





  return next(req); // RESPONS
};
