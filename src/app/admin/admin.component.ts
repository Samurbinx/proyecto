import { Component, OnInit, platformCore } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../services/place.service';
import { PlaceModel } from '../models/place.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	place: PlaceModel | undefined;
	placeSelected: PlaceModel | undefined;
	places: PlaceModel[] | undefined;
	adminForm: FormGroup;
	addPlaceForm: FormGroup;

  	constructor(private _fb: FormBuilder, private _router: Router, private _placeService: PlaceService) {
		this.adminForm = this._fb.group({
			nombre: ['', Validators.required],
			desc: ['']
		}),
		this.addPlaceForm = this._fb.group({
			nombre: ['', Validators.required],
			desc: ['']
		})
	}

	ngOnInit(): void {
		this._placeService.getPlaces().subscribe(
			(data: PlaceModel[]) => {
			  this.places = data;
			},
			(error) => {
			  console.log("Error");
			}
		  );
	}

	eliminar(id: number){
		let con = confirm("¿Desea borrar el lugar?");
		if (con) {
			this._placeService.deletePlace(id).subscribe();
			alert("Lugar borrado correctamente");
			window.location.reload();
		}
	}

	edit(id: number){
		this._placeService.getPlace(id).subscribe(
			(data: PlaceModel) => {
				this.placeSelected = data;
			},
			(error) => {
			  console.log("Error");
			}
		  );
	}

	guardarDatos(): void {
		if (this.adminForm.valid) {
			if (this.placeSelected) {
				this.placeSelected.nombre = this.adminForm.value.nombre;
				this.placeSelected.descripcion = this.adminForm.value.desc;
				this._placeService.editPlace(this.placeSelected.id, this.placeSelected).subscribe(
					(data: PlaceModel) => {
						this.placeSelected = data;
						alert("Cambios realizados correctamente")
						window.location.reload();
					},
					(error) => {
						alert("Error");
					  console.log("Error");
					}
				  );
			}
		} else {
			console.log('El formulario no es válido');
		}
	}

	reload(): void {
		window.location.reload();
	}

	addPlace(){
		if (this.addPlaceForm.valid) {
			let id;
			if (this.places) {
				id = this.places.length + 1;
			} else {
				id = 0;
			}

			let nombre = this.addPlaceForm.value.nombre;
			let descripcion = this.addPlaceForm.value.desc;
			let place = new PlaceModel(id, nombre, descripcion, 0, []);
			this._placeService.addPlace(place).subscribe(
				(data: PlaceModel) => {
					alert("Lugar añadido correctamente")
					window.location.reload();
				},
				(error) => {
					alert("Error");
					console.log("Error");
				}
				);
			
		} else {
			console.log('El formulario no es válido');
		}

		
	}
	  
}
