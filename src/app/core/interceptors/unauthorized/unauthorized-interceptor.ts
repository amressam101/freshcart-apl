import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {

  let router = inject(Router)

  //REQUSET 
  return next(req).pipe(catchError((err) => {

    if (err.status == 401 && err.statusText == 'Unauthorized') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        background: "#f3f4f6",
        color: "#6b7280",

        customClass: {
          popup: "rounded-xl shadow-md",
          title: "font-medium text-gray-500"
        },

        didOpen: (toast) => {
          // progress bar color
          const progress = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
          if (progress) {
            progress.style.background = "#ef4444";
          }

          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "error",
        title: `${err.error.message}`
      });
      router.navigate(['/login'])
    }
    else if (err.error.message === "No document for this id 6439d40367d9aa4ca97064a8") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        background: "#f3f4f6",
        color: "#6b7280",

        customClass: {
          popup: "rounded-xl shadow-md",
          title: "font-medium text-gray-500"
        },

        didOpen: (toast) => {
          // progress bar color
          const progress = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
          if (progress) {
            progress.style.background = "#ef4444"; // red-500
          }

          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "error",
        title: `No documents available in Beauty & Health category`
      });
    }
    else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        background: "#f3f4f6",
        color: "#6b7280",

        customClass: {
          popup: "rounded-xl shadow-md",
          title: "font-medium text-gray-500"
        },

        didOpen: (toast) => {
          // progress bar color
          const progress = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
          if (progress) {
            progress.style.background = "#ef4444"; // red-500
          }

          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "error",
        title: `${err.error.message}`
      });
    }



    return throwError(() => err)
  }));//RESPONSE 
};
