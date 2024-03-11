import { Component } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { PlaceService } from '../services/place.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewModel } from '../models/review.model';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
    place: PlaceModel;
    reviews: ReviewModel[] | undefined;
    id: string;
    firstname: any;
    email: any;
    isAdmin: boolean | undefined;
    resenia: FormGroup;
    totalPuntos: number;
	myreview: ReviewModel;
	currentIndex = 0;


  tiles: Tile[] = [
    {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private _placeService: PlaceService, 
    private route: ActivatedRoute, 
    private _cookieService: CookieService,
    private _fb: FormBuilder,
    private _userService: UserService
    ){
      this.id = "";
      this.totalPuntos = 0;
	  this.myreview = new ReviewModel("","",0,"");
	  this.place = new PlaceModel(0,"","",0,[]);
      this.resenia = this._fb.group ({
        puntuacion: new FormControl('', Validators.required),
        desc: new FormControl('', Validators.required)
      })

  }
  
ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? idParam : '';
    if (idParam == null) {
        this.id = "";
    } else {
        this._placeService.getPlace(parseInt(idParam)).subscribe(
            (data: PlaceModel) => {
                this.place = data;
            },
            (error) => {
                console.log("Error fetching place details");
            }
        );

        this._placeService.getPlaceReviews(idParam).subscribe(
            (data: ReviewModel[]) => {
                this.reviews = data;
                // Update total points after fetching reviews
                this.totalPuntos = this.getTotalPuntos();
                // Update place with total points
                if (this.place) {
                    this.place.puntuacion = this.totalPuntos;
                    this._placeService.editPlace(this.place.id, this.place).subscribe(
                        (updatedPlace: PlaceModel) => {
                            
                        },
                        (error) => {
                            console.log("Error updating place with total points");
                        }
                    );
                }
            },
            (error) => {
                console.log("Error fetching reviews");
            }
        );
    }
}



  getLoggedFirstName(): boolean {
    let token: string = this._cookieService.get('token');  
    
    if (!token)
      return false;

    else {
      let tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.firstname = tokenPayload.nombre; 

      if (tokenPayload.role === "administrador"){
        return false;
      }
      return true;
    }
  }

publicar(): boolean {
    var user: UserModel;
    if (this.resenia.valid) {
        this._userService.getUserByName(this.firstname).subscribe({
            next: (result: UserModel | undefined) => {
                if (result) {
                    user = result;

                    let review: ReviewModel = new ReviewModel(
                        user.email,
                        this.id,
                        this.resenia.value.puntuacion,
                        this.resenia.value.desc
                    )

                    this._placeService.addReview(review).subscribe({
                        next: (place: ReviewModel | undefined) => {
                            if (place) {
                                
                                this._placeService.getPlaceReviews(this.id).subscribe(
                                    (data: ReviewModel[]) => {
                                        this.reviews = data;
                                        this.totalPuntos = this.getTotalPuntos();
										window.location.reload();
                                    },
                                    (error) => {
                                        console.log("Error");
                                    }
                                );
                            }
                        }
                    })
                }
            }
        });
        return true;
    } else {
        return false;
    }
}


  getTotalPuntos(){
    let totalPuntos = 0;
    if (this.reviews && this.reviews.length > 0) {
      this.reviews.forEach(review => {
        totalPuntos += review.puntos;
      });
      return parseFloat((totalPuntos/this.reviews.length).toFixed(1));
    }
    return 0;
  }
 
//   hasReview(): any {
//       if (this.reviews && this.reviews.length == 0) {
// 			return false;
//       } else {
//         this._userService.getUserByName(this.firstname).subscribe({
//           next: (result : UserModel | undefined) => {
//             if (result) {
//               const email = result.email;
//               if (this.reviews && email) {
//                 for (let review of this.reviews){
// 					if (review.userEmail == email) {
// 						return true;
// 					}
// 				}
//               }
// 			  return false;
//             } else {
//              return false;
//             }
//           },
//           error: (err) => {
// 			  return false;
//           }
//         });
//       }
//     };
  
// 	myReview(): any {
// 		this._userService.getUserByName(this.firstname).pipe(
// 			map((result: UserModel | undefined) => {
// 				if (result) {
// 					const email = result.email;
// 					if (email && this.reviews) {
// 						let find = this.reviews.find(review => review.userEmail === email);
// 						if (find) {
// 							this.myreview = find;
// 							return this.myreview;

// 						}
// 					}
// 					return false;
// 				}
// 				return false;
// 			})
// 		);
// 	}


}
