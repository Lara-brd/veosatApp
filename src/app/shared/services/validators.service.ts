import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    // Función que regresa una función para evaluar y me permite tener el control de el fromGroup
    isFieldOneEqualFieldTwo( field1: string, field2: string ){

      return  ( formGroup: AbstractControl <any, any>): ValidationErrors | null => {

        //Se puede hacer de manera asíncrona que choque con el bakcend, lo haria esta misma función
        const fieldValue1 = formGroup.get(field1)?.value ||'';
        const fieldValue2 = formGroup.get(field2)?.value ||'';
        // Ya tengo los dos valores de las cajas de texto field

        if( fieldValue1 !== fieldValue2 ){
          formGroup.get(field2)?.setErrors({ notEqual: true })
          return { notEqual: true }
        }
        // con que un input tenga un error todo el formulario va a tener error

        // si son iguales no pasa nada
        // Esto va a quitar cualquier otro error
        formGroup.get(field2)?.setErrors( null );
        return null;
      }
    }

    isValidField( form:FormGroup, field: string ){
      return form.controls[field].errors && form.controls[field].touched;
    }

}
