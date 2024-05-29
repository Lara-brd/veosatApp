import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
;
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl:'./login-page.component.scss',
  providers:[ MessageService ]
})
export class LoginPageComponent implements OnInit{

  public loginForm:FormGroup = this.fb.group({
    email:['', [ Validators.required, Validators.pattern( this.validatorsSvc.emailPattern ) ] ],
    password: ['', [Validators.required, Validators.minLength(4) ]]
  })

  constructor(
    private authSvc:AuthService,
    private fb: FormBuilder,
    private validatorsSvc:ValidatorsService,
    private router:Router,
    private messageService: MessageService
  ){}

  ngOnInit(): void {}

  onSubmitUser(){
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    };

    // Recojo los datos del formulario y compruebo si son validos ( al utilizar backend verificaria el token )
    const { email, password } = this.loginForm.value;
    const usuarioActivo = this.authSvc.verificarCredenciales( email, password);

    // SI usuarioActivo = undefined no existe en la base de datos
    if( usuarioActivo === undefined ){
      this.showToast();
      return;
    };
    this.authSvc.usuarioActivoNombre = usuarioActivo.user;

    // En local storage deberiamos guardar el token
    this.authSvc.setLocalStorageItem('userId', usuarioActivo.id);

    // Mandamos true a guars para permitir acceso a home
    this.authSvc.setAuthSuccess(true);
    this.router.navigateByUrl('/home')
  }

  // Métodos para avisos de error en html del formulario//////////////
  ////////////////////////////////////////////////////////////////////

  isValidField( field:string ){
    return this.validatorsSvc.isValidField( this.loginForm, field)
  }

   // Campo de error dinámico
   getFieldError( field:string ):string | null {
    if( !this.loginForm.controls[field] ) return null;
    // Si es nulo regresa objeto vacio
    const errors = this.loginForm.controls[field].errors || {};
    // forof tab
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'pattern':
          return 'Formato incorrecto';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters`;
      }

    }
    // cualquier otra cosa regresa null o ''
    return null;
  }

  ////////////////////////////////////////////////////////////////

  showToast() {
    this.messageService.add({ severity: 'error', summary: 'Error en ', detail: 'Usuario o contraseña' });
  }


}
