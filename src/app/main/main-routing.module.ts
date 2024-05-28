import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloPageComponent } from './pages/hello-page/hello-page.component';
import { HomeComponent } from './pages/home/home.component';
import { InformeComponent } from './pages/informe/informe.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path:'hello', component:HelloPageComponent },
      { path:'informe', component:InformeComponent },
      { path:'**', redirectTo:'hello' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
