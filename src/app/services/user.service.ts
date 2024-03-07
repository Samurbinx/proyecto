import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API = 'http://localhost:3000';

  private loggedIn: boolean = false;
  private currentUser: any;

  constructor(private _http: HttpClient) { }

  addUser(user: UserModel): Observable<UserModel> {
    return this._http.post<UserModel>(`${this.URL_API}/users`, user);
  }

  editUser(id: number, user: UserModel): Observable<UserModel> {
    return this._http.put<UserModel>(`${this.URL_API}/users/${id}`, user);
  }
  
  getUser(id: number): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${this.URL_API}/users/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`${this.URL_API}/users/${id}`);
  }

  logout(): void {
    // Limpia los datos del usuario y establece loggedIn en falso
    this.loggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    // Comprueba si el usuario ha iniciado sesión
    return this.loggedIn;
  }

  getCurrentUser(): any {
    // Devuelve los datos del usuario actualmente autenticado
    return this.currentUser;
  }

  getUserName(): string {
    return this.currentUser;
  }
}
