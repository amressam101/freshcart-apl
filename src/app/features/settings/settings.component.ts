import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Iuser } from '../../core/models/Iuser/iuser.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly platFormId = inject(PLATFORM_ID)


  userData: WritableSignal<Iuser> = signal({} as Iuser)
  isLoading: WritableSignal<boolean> = signal(false)


  ngOnInit(): void {
    this.getVerifyToken();
  }

  getVerifyToken(): void {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.isLoading.set(true);
        this.authService.getVerifyToken().pipe(finalize(() => {
          this.isLoading.set(false);
        })).subscribe({
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
