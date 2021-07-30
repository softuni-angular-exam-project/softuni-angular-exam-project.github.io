import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthActivate } from './core/guards/auth.activate';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import ('./home/home.module').then(m => m.HomeModule)},
  {path: 'products', loadChildren: () => import ('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthActivate], 
    data: {
      autenticationRequired: true,
      autenticationFailureRedirectUrl: '/signin',
    }
  },
  {path: 'market', loadChildren: () => import ('./market/market.module').then(m => m.MarketModule),
    canActivate: [AuthActivate], 
    data: {
      autenticationRequired: true,
      autenticationFailureRedirectUrl: '/signin',
    }
  },
  {path: 'comments', loadChildren: () => import ('./comments/comments.module').then(m => m.CommentsModule)},
  {path: 'signup', loadChildren: () => import ('./signup/signup.module').then(m => m.SignupModule),
    canActivate: [AuthActivate], 
    data: {
      autenticationRequired: false,
      autenticationFailureRedirectUrl: '/',
    }
  },
  {path: 'signin', loadChildren: () => import ('./signin/signin.module').then(m => m.SigninModule),
    canActivate: [AuthActivate],
    data: {
      autenticationRequired: false,
      autenticationFailureRedirectUrl: '/',
    }
  },
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
