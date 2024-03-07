import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    // Verifica si el usuario ha iniciado sesión
    this.isLoggedIn = this._userService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this._userService.getUserName();
    }
  }

  logout() {
    this._userService.logout();
    this.isLoggedIn = false;
  }
}