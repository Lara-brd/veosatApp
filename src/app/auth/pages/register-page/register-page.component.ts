import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  providers:[ MessageService ],
  templateUrl: './register-page.component.html',
  styleUrls:['./register-page.component.scss']
})
export class RegisterPageComponent {

  // TODO validación de contraseña más compleja con un pattern
  registerForm:FormGroup = this.fb.group({
    nombre:['', [ Validators.required ]],
    email:['', [ Validators.required, Validators.pattern(this.validatorsSvc.emailPattern) ]],
    password:['', [ Validators.required, Validators.minLength(4)] ],
    password2:['', [ Validators.required, Validators.minLength(4)] ]
  },
  {
    validators: [
      this.validatorsSvc.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })

  constructor(
    private fb:FormBuilder,
    private validatorsSvc: ValidatorsService,
    private authSvc:AuthService,
    private router:Router,
    private messageService: MessageService
  ){}

  onSubmitRegister(){
    this.registerForm.markAllAsTouched();
    if( this.registerForm.invalid )return;
    this.authSvc.addUser( this.registerForm.value );
    this.showToast();

    // Una vez creado el nuevo usuario se navega al login
    this.router.navigateByUrl('/auth/login');

  }

  // Métodos para avisos de error en html del formulario
  isValidField( field:string ){
    return this.validatorsSvc.isValidField( this.registerForm, field)
  }

  // Campo de error dinámico
  getFieldError( field:string ):string | null {
    // Si el formulario no tiene ese campo y no tiene errores no regreso nada
    if( !this.registerForm.controls[field] ) return null;
    // Si es nulo regresa objeto vacio
    const errors = this.registerForm.controls[field].errors || {};
    // forof tab
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'pattern':
          return 'Formato incorrecto';
        case 'notEqual':
          return 'Las contraseñas deben coincidir'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters`;
      }

    }
    // cualquier otra cosa regresa null o ''
    return null;
  }

  showToast() {
    this.messageService.add({ severity: 'error', summary: 'Error en ', detail: 'Usuario o contraseña' });
  }

}
