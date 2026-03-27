import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  private readonly platFormId = inject(PLATFORM_ID)

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platFormId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }

}
