import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Usuario actual
  usuarioActivoNombre:string = '';

  // Propiedad utilizada en guard que permite el acceso a home
  private _authSuccess:boolean = false;

  get authSuccess(){
    return this._authSuccess;
  }

  setAuthSuccess(success:boolean):void {
    this._authSuccess = success;
  }

  private _newUserEmail:string = '';

  get newUser():string {
    return this._newUserEmail;
  }


  // Listado de usuario provisional -> los usuarios deberan venir de backend y sus contraseñas encriptadas de manera que aqui se trabajará con el token
  private _usersList:User[] = [
    {
      id:'01',
      user:'Lara',
      email: "lara@test.com",
      password:"11AA"
    },
    {
      id:'02',
      user:'Ana',
      email: "ana@test.com",
      password:"22BB"
    }
  ]

  private apiUrl: string = 'assets/apis/users.json';

  constructor( private http: HttpClient ) {
    // Al guardar el token en localStorage la sesion es persistente
    this.checkToken();
  }

  // se verifica token si está guardado en localstorage
  private checkToken(){
    const TOKEN = this.getLocalSorageItem('userId');
    const usuario = this.getUsuarioActivoById(TOKEN);

    this.usuarioActivoNombre = usuario?.user || '';

    // Si no existe email es que no hay usuario guardado en localstorage
    if( usuario?.email === undefined ) return;

    const usuarioChecked = this.verificarCredenciales(usuario.email, usuario.password);

    // Si el usuario se ha checkeado y es correcto permitimos entrar a pag principal
    if(usuarioChecked === undefined){
      this._authSuccess = false;
    }else{
      this._authSuccess = true;
    }
  }
    // TODO: Reemplazar la validación de contraseña actual con una validación basada en tokens.
  // Actualmente,la aplicación utiliza el id del usuario como token ->
  // En lugar de validar con la contraseña en duro, debemos implementar un sistema de autenticación basado en tokens (JWT) para otorgar acceso a la aplicación.
  // El password debera estar encriptado en backend y en local storage quedará guardado el token.

  // Función para verificar credenciales -> equivalente a verificar el token si es valido
  verificarCredenciales(email: string, password: string): User | undefined {
    const userExist = this._usersList.find(user => user.email === email && user.password === password);
    return userExist;
  }

  //A través del id identifica el usuario activo
  getUsuarioActivoById(userId:string){
    const usuarioActivo = this._usersList.find( ({id}) => id === userId);
    return usuarioActivo;
  }

  // Añade usuario en la aplicación ( new-account )
  addUser( user: User ){
    this._usersList.push(user);
    this._newUserEmail = user.email
  }



  // LOCALSTORAGE/////////////////////////////////////////////////////////////

  setLocalStorageItem(key:string, value:any ){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalSorageItem(key:string){
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  removeLocalStorageItem():void{
    localStorage.removeItem('userId');
  }
  ////////////////////////////////////////////////////////////////////////////

}
