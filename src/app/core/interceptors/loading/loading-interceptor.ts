import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { hidden } from '@angular/forms/signals';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  //REQUEST
  let spinner = inject(NgxSpinnerService)

  spinner.show();

  return next(req).pipe(finalize(() => {
    spinner.hide();
  }));//RESPONS
};
