import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthResolver } from './core/guards/auth.resolver';

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import ('./home/home.module').then(m => m.HomeModule)},
  {path: 'products', loadChildren: () => import ('./products/products.module').then(m => m.ProductsModule)},
  {path: 'market', loadChildren: () => import ('./market/market.module').then(m => m.MarketModule)},
  {path: 'comments', loadChildren: () => import ('./comments/comments.module').then(m => m.CommentsModule)},
  {path: 'signup', loadChildren: () => import ('./signup/signup.module').then(m => m.SignupModule)},
  {path: 'signin', loadChildren: () => import ('./signin/signin.module').then(m => m.SigninModule)},
  {path: '**', redirectTo: '/signin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
