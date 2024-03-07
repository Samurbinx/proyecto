import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder){
    this.registroForm = this._fb.group({
      nombre: [''],
      apellidos: [''],
      email: [''],
      telefono: [''],
      contraseña: ['']
    });
  }

  submitForm() {
    if (this.registroForm.valid) {
      let userData: UserModel = new UserModel(  
        this.registroForm.value.nombre,
        this.registroForm.value.apellidos,
        this.registroForm.value.email,
        this.registroForm.value.telefono,
        this.registroForm.value.contraseña,
      );

      
        this._userService.addUser(userData).subscribe({
          next: (val: any) => {
            alert("perfe");
          },
          error: console.log
        });
      
      } 
  }
}
