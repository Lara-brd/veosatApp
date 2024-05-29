import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent {

  get userName(){
    return this.authSvc.usuarioActivoNombre;
  }
  constructor(
    private authSvc:AuthService,
    private router:Router
  ){}

  logout(){
    this.authSvc.removeLocalStorageItem();
    this.router.navigateByUrl('/auth/login')
  }

}
