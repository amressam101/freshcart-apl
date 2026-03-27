import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly router = inject(Router)

  checkoutForm !: FormGroup;
  cartId: WritableSignal<string | null> = signal('')


  ngOnInit(): void {
    this.FormCheckout();
    this.getCartId();
  }


  FormCheckout() {
    this.checkoutForm = this.fb.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      city: [null, [Validators.required],]
    })
  }


  checkoutSection(): void {
    let payload = {
      shippingAddress: this.checkoutForm.value
    }
    this.cartService.checkOutSession(this.cartId(), payload).subscribe({
      next: (res) => {
        if (res.status === "success") {
          console.log(res);
          window.open(res.session.url, '_self')
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  createCashOrder(): void {
    let payload = {
      shippingAddress: this.checkoutForm.value
    }
    this.cartService.createCashOrder(this.cartId(), payload).subscribe({
      next: (res) => {
        if (res.status == "success") {
          this.sweetAlertSuccessMesage(res.status);
          this.router.navigate(['/allorders'])
          console.log(res);
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlPath) => {
        this.cartId.set(urlPath.get('cartId'))
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
      title: ` ${succesMasg}`
    });
  }



}
