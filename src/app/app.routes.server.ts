import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product-details/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout/:cartId',
    renderMode: RenderMode.Client,
  },
  {
    path: 'allorders',
    renderMode: RenderMode.Client,
  },
  {
    path: 'products-brand/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'categories-details/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];