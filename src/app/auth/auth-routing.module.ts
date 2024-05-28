import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthPageComponent } from './pages/layout-auth-page/layout-auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { registerLocaleData } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutAuthPageComponent,
    children:[
      { path:'login', component:LoginPageComponent  },
      { path:'new-account', component:RegisterPageComponent },
      { path:'**', redirectTo:'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
