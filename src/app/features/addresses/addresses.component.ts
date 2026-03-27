import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AddressesService } from '../../core/service/addresses/addresses.service';
import { finalize } from 'rxjs';
import { Iaddress } from '../../core/models/IAddress/iaddress.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  imports: [ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent implements OnInit {

  private readonly addressesService = inject(AddressesService)
  private readonly fb = inject(FormBuilder)

  showModal: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  loadingAdd: WritableSignal<boolean> = signal(false);
  loadingRemove = signal<Record<string, boolean>>({});
  addressList: WritableSignal<Iaddress> = signal({} as Iaddress)

  addresseForm !: FormGroup;


  ngOnInit(): void {
    this.formInt();
    this.getLoggedUserAddresses();
  }

  openTheModal(): void {
    this.showModal.update(value => !value)
  }

  closeTheModal(e: PointerEvent): void {
    e.preventDefault()
    this.showModal.update(value => !value)
  }


  formInt(): void {
    this.addresseForm = this.fb.group({
      name: [null, [Validators.required]],
      details: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      city: [null, [Validators.required]],
    })
  }


  addAddress(): void {
    if (this.addresseForm.valid) {
      this.loadingAdd.set(true);
      this.addressesService.addAddress(this.addresseForm.value).pipe(finalize(() => {
        this.loadingAdd.set(false);
      })).subscribe({
        next: (res) => {
          if (res.status === "success") {

            // 1. show sweetAlert mesage 
            this.sweetAlertSuccessMesage(res.message)

            // 2. upadte the addressList 
            this.addressList.update(currentAddresses => ({
              ...currentAddresses,
              data: res.data
            }));

            // clear Form Address 
            this.addresseForm.reset()

            // close the moadal
            this.showModal.update(value => !value)
          }

        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.addresseForm.markAllAsTouched()
    }
  }


  getLoggedUserAddresses(): void {
    this.isLoading.set(true);
    this.addressesService.getLoggedUserAddresses().pipe(finalize(() => {
      this.isLoading.set(false);
    })).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.addressList.set(res)
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  removeAddress(addressId: string): void {
    this.loadingRemove.update(prev => ({
      ...prev,
      [addressId]: true
    }));
    this.addressesService.removeAddress(addressId).pipe(finalize(() => {
      this.loadingRemove.update(prev => ({
        ...prev,
        [addressId]: false
      }));
    })).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.sweetAlertSuccessMesage(res.message)
          this.addressList.update(currentAddresses => ({
            ...currentAddresses,
            results: res.data.length,
            data: res.data
          }));
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
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
      title: `${succesMasg} `
    });
  }
}
