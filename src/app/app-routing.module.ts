import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authGuard, canMatchGuard } from './guards/auth.guard';



const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m => m.AuthModule ),
  },
  {
    path:'home',
    canActivate: [ authGuard ],
    canMatch: [ canMatchGuard ],
    loadChildren: ()=> import('./main/main.module').then(m => m.MainModule ),
  },
  {
    path:'error',
    component:Error404PageComponent
  },
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'error'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
