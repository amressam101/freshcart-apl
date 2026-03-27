import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: WritableSignal<boolean> = signal(false);
  timeoutId: any;
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/)]],
      rePassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { Validators: this.confirmPassword })
  }

  confirmPassword(gp: AbstractControl) {
    // 1. password value 
    const password = gp.get('password')?.value;
    // 2. rePassword value 
    const rePassword = gp.get('rePassword')?.value;
    // 3. check if password == rePassword true | mismatch
    if (password === rePassword) {
      return null
    } else {
      return { mismatch: true }
    }
  }

  signUp(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.SignUp(this.registerForm.value).pipe(finalize(() => {
        this.isLoading.set(false);
      })).subscribe({
        next: (res) => {
          if (res.message === "success") {

            // 1. show success mesage Alert
            this.sweetAlertSuccessMesage(res.message);

            // 2. resat the form data
            this.registerForm.reset();

            // 3. navgite to login 
            this.timeoutId = setTimeout(() => {
              this.router.navigate(['/login'])
            }, 4000)
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }


  sweetAlertSuccessMesage(succesMasg: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      background: "#f3f4f6", // gray-100
      color: "#6b7280", // gray-500 text

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
      title: ` ${succesMasg} , Account created successfully`
    });
  }




  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

}
