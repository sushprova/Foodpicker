import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import{
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
}from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/tabs/home']);

const routes: Routes = [
  {
    path: 'tabs',
    ...canActivate(redirectUnauthorizedToLogin),
    component: TabsPage,
    children: [
    
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        
      },
      {
        path: 'filter',
        loadChildren: () => import('../filter/filter.module').then(m => m.FilterPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: '',
        //if it is tabs in the URL, not tabs/something , then it will take you to home
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'signup',
    loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('../forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  // {
  // {
  //   path: 'signup',
  //   loadChildren: () => import('../signup/signup-routing.module').then( m => m.SignupPageRoutingModule)
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
    //when served, it goes to the default page, then this module says that if this is default, i will redirect to login
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
