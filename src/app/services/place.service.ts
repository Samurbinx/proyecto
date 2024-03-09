import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { Observable, map, mergeMap } from 'rxjs';
import { ReviewModel } from '../models/review.model';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private URL_API = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  addPlace(place: PlaceModel): Observable<PlaceModel> {
    return this._http.post<PlaceModel>(`${this.URL_API}/places`, place);
  }

  editPlace(id: number, place: PlaceModel): Observable<PlaceModel> {
    return this._http.put<PlaceModel>(`${this.URL_API}/places/${id}`, place);
  }

  getPlace(id: number): Observable<PlaceModel> {
    return this._http.get<PlaceModel>(`${this.URL_API}/places/${id}`);
  }
  
  getPlaces(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>(`${this.URL_API}/places`);
  }

  deletePlace(id: number): Observable<PlaceModel> {
    return this._http.delete<PlaceModel>(`${this.URL_API}/places/${id}`);
  }

  editPlacePoints(id: number, pts: number): Observable<PlaceModel> {
    return this._http.get<PlaceModel>(`${this.URL_API}/places/${id}`).pipe(
      mergeMap((place: PlaceModel) => {
        // Luego, creamos una copia del lugar actual con los puntos actualizados
        const updatedPlace: PlaceModel = {
          ...place,
          puntuacion: pts // Actualizamos los puntos
        };
        console.log(updatedPlace);
        // Finalmente, realizamos la solicitud PUT con la copia actualizada
        return this.editPlace(id, updatedPlace);
      })
    );
  }

  addReview(review: ReviewModel){
    return this._http.post<ReviewModel>(`${this.URL_API}/review`, review);
  }
  getReviews(): Observable<ReviewModel[]>{
    return this._http.get<ReviewModel[]>(`${this.URL_API}/review`)
  }

  getPlaceReviews(idPlace: string): Observable<ReviewModel[]> {
    return this.getReviews().pipe(
      map(reviews => reviews.filter(review => review.idPlace === idPlace))
    );
  }

}
