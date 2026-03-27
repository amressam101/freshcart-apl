import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./core/auth/login/login.component').then(c => c.LoginComponent), title: "FreshCart" },
    { path: 'register', loadComponent: () => import('./core/auth/register/register.component').then(c => c.RegisterComponent), title: "FreshCart" },
    { path: 'forgot-password', loadComponent: () => import('./core/auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent), title: "Forgot Password | FreshCart" },
    { path: 'home', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent), title: "FreshCart" },
    { path: 'shop', loadComponent: () => import('./features/shop/shop.component').then(c => c.ShopComponent), title: "FreshCart" },
    { path: 'product-details/:id', loadComponent: () => import('./features/product-details/product-details.component').then(c => c.ProductDetailsComponent), title: "FreshCart" },
    { path: 'category', loadComponent: () => import('./shared/components/categories/categories.component').then(c => c.CategoriesComponent), title: "FreshCart" },
    { path: 'categories-details/:id', loadComponent: () => import('./features/categories-details/categories-details.component').then(c => c.CategoriesDetailsComponent), title: "FreshCart" },
    { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then(c => c.BrandsComponent), title: "FreshCart" },
    { path: 'products-brand/:id', loadComponent: () => import('./features/products-brand/products-brand.component').then(c => c.ProductsBrandComponent), title: "FreshCart" },
    {
        path: 'profile', loadComponent: () => import('./features/profile/profile.component').then(c => c.ProfileComponent), title: "FreshCart", canActivate: [authGuard], children: [
            { path: '', redirectTo: 'addresses', pathMatch: 'full' },
            { path: 'addresses', loadComponent: () => import('./features/addresses/addresses.component').then(c => c.AddressesComponent), title: "FreshCart" },
            { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(c => c.SettingsComponent), title: "FreshCart" },
        ]
    },
    { path: 'support', loadComponent: () => import('./features/support/support.component').then(c => c.SupportComponent), title: "FreshCart" },
    { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(c => c.WishlistComponent), title: "FreshCart", canActivate: [authGuard] },
    { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent), title: "FreshCart", canActivate: [authGuard] },
    { path: 'allorders', loadComponent: () => import('./features/allorders/allorders.component').then(c => c.AllordersComponent), title: "FreshCart", canActivate: [authGuard] },
    { path: 'checkout/:cartId', loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent), title: "FreshCart", canActivate: [authGuard] },
    { path: 'all-categories', loadComponent: () => import('./features/all-categories/all-categories.component').then(c => c.AllCategoriesComponent), title: "FreshCart" },
    { path: 'electronics', loadComponent: () => import('./features/electronics/electronics.component').then(c => c.ElectronicsComponent), title: "FreshCart" },
    { path: 'women-fashion', loadComponent: () => import('./features/women-fashion/women-fashion.component').then(c => c.WomenFashionComponent), title: "FreshCart" },
    { path: 'men-fashion', loadComponent: () => import('./features/men-fashion/men-fashion.component').then(c => c.MenFashionComponent), title: "FreshCart" },
    { path: 'beauty', loadComponent: () => import('./features/beauty/beauty.component').then(c => c.BeautyComponent), title: "FreshCart" },
    { path: 'terms-service', loadComponent: () => import('./features/terms-service/terms-service.component').then(c => c.TermsServiceComponent), title: "Terms of Service | FreshCart" },
    { path: 'privacy-policy', loadComponent: () => import('./features/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent), title: 'Privacy Policy | FreshCart' },
    { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(c => c.NotFoundComponent), title: "FreshCart" },
];