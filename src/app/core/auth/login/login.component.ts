import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { Iuser } from '../../models/Iuser/iuser.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly platFormId = inject(PLATFORM_ID)

  showPassword: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  userData: WritableSignal<Iuser> = signal({} as Iuser)
  timeoutId: any;
  loginForm!: FormGroup;



  ngOnInit(): void {
    this.formInit();
  }


  formInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/)]],
    })
  }

  siginIn() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.SignIn(this.loginForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          if (res.message === "success") {

            // 1. show success mesage Alert
            this.sweetAlertSuccessMesage(res.message);

            // 2. seaved the token in localstorge 
            localStorage.setItem('token', res.token)

            // 3. set the user data in interfaces 
            // this.userData.set(res.user)

            // 4. resat the form data
            this.loginForm.reset();

            this.authService.isLoggedIn.set(true);

            // 3. navgite to login 
            this.router.navigate(['/home'])


            this.getVerifyToken();

          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }


  toggelTypeInput(): void {
    this.showPassword.update(value => !value)
  }

  sweetAlertSuccessMesage(succesMasg: string): void {
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
          progress.style.background = "#22c55e"; // green-500
        }

        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: "success",
      title: ` ${succesMasg} , Login successfully`
    });
  }

  getVerifyToken(): void {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.authService.getVerifyToken().subscribe({
          next: (res) => {
            if (res.message === "verified") {
              this.userData.set(res.decoded)
            }
          },
          error: (err) => {
            console.log(err);

          }
        })
      }
    }
  }


}
