import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  showPassword: WritableSignal<boolean> = signal(false);
  showConfimPassword: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  stepNumber: WritableSignal<number> = signal(1);
  iconCheckOne: WritableSignal<boolean> = signal(false)
  iconCheckTwo: WritableSignal<boolean> = signal(false)
  iconCheckThree: WritableSignal<boolean> = signal(false)
  iconeActive: WritableSignal<number> = signal(0);
  savedEmail: WritableSignal<string> = signal('');
  timeoutId: any;


  forgotPasswordForm !: FormGroup;
  verifyResetCodeForm !: FormGroup;
  resetPasswordForm !: FormGroup;


  ngOnInit(): void {
    this.FormIntForgotPassword();
    this.FormIntVerfiyResetCode();
    this.FormIntResetPassword();

  }

  toggleShowPassword(): void {
    this.showPassword.update(value => !value)
  }

  toggleShowConfimPassword(): void {
    this.showConfimPassword.update(value => !value)
  }

  FormIntForgotPassword(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  FormIntVerfiyResetCode(): void {
    this.verifyResetCodeForm = this.fb.group({
      resetCode: [null, [Validators.required]]
    })
  }

  FormIntResetPassword(): void {
    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/)]]
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  ChangeEmail(): void {
    this.iconCheckOne.set(false);
    this.iconeActive.set(0);
    this.stepNumber.set(1);
  }

  resendCodeAging(e: PointerEvent): void {
    e.preventDefault();
    if (this.savedEmail()) {
      this.isLoading.set(true);
      this.authService.forgotPassword({ email: this.savedEmail() }).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          if (res.statusMsg == 'success') {
            this.sweetAlertSuccessMesage('New code sent!');
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


  forgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      this.authService.forgotPassword(this.forgotPasswordForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          if (res.statusMsg == 'success') {
            // 1. show success mesage Alert
            this.sweetAlertSuccessMesage(res.message);
            this.savedEmail.set(this.forgotPasswordForm.value.email);

            // 2. change to step 2
            this.timeoutId = setTimeout(() => {
              this.iconCheckOne.set(true);
              this.iconeActive.set(1);
              this.stepNumber.set(2);
            }, 1000)

            // 3. resat the form data
            this.forgotPasswordForm.reset();
          }
        },
        error: (err) => {
          console.log(err);
        }
      })

    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  verifyResetCode(): void {
    if (this.verifyResetCodeForm.valid) {
      this.isLoading.set(true);
      this.authService.verifyResetCode(this.verifyResetCodeForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          if (res.status == 'Success') {

            // 1. show success mesage Alert
            this.sweetAlertSuccessMesage('Code verified');

            // 2. change to step 2
            this.timeoutId = setTimeout(() => {
              this.iconCheckTwo.set(true);
              this.iconeActive.set(2);
              this.stepNumber.set(3);

              this.resetPasswordForm.patchValue({
                email: this.savedEmail()
              });
            }, 1000);

            // 3. resat the form data
            this.verifyResetCodeForm.reset();
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.verifyResetCodeForm.markAllAsTouched();
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading.set(true);
      this.authService.resetPassword(this.resetPasswordForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          // 1. change the old token to new token 
          localStorage.setItem('token', res.token);

          // 2.show success mesage Alert
          this.sweetAlertSuccessMesage('Password reset successfully!');

          // change to step 3
          this.iconCheckThree.set(true);
          this.stepNumber.set(5);
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
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
      title: ` ${succesMasg}`
    });
  }


  clearTimeOuId(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }


  ngOnDestroy(): void {
    // clear id of timeOut
    this.clearTimeOuId();

    // Reset step signals
    this.stepNumber.set(1);
    this.iconCheckOne.set(false);
    this.iconCheckTwo.set(false);
    this.iconCheckThree.set(false);
    this.iconeActive.set(0);
  }
}
