import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  let platFormId = inject(PLATFORM_ID)

  if (isPlatformBrowser(platFormId)) {
    if (localStorage.getItem('token')) {
      return true
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        background: "#f3f4f6", // gray-100
        color: "#6b7280",      // gray-500

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
        title: "you need to be logged in to access this page"
      });
      return router.parseUrl('/login')
    }
  } else {
    return true;
  }




};
