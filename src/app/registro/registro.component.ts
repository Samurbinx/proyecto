import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder, private router: Router){
    this.registroForm = this._fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.registroForm.valid) {
      let userData: UserModel = new UserModel(  
        this.registroForm.value.email,
        this.registroForm.value.nombre,
        this.registroForm.value.apellidos,
        this.registroForm.value.telefono,
        this.registroForm.value.pwd,
        "usuario",
        "pwd"
      );

      
        this._userService.addUser(userData).subscribe({
          next: (val: any) => {
            this.router.navigate(['/login']);
          },
          error: console.log
        });
      
      } else {
        console.log("error falta cozas");
      }
  }
}
