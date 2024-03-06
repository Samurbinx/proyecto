import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private URL_API = 'http://localhost:3000/places';

  constructor(private _http: HttpClient) { }

  addPlace(place: PlaceModel): Observable<PlaceModel> {
    return this._http.post<PlaceModel>(`${this.URL_API}`, place);
  }

  editPlace(id: number, place: PlaceModel): Observable<PlaceModel> {
    return this._http.put<PlaceModel>(`${this.URL_API}/${id}`, place);
  }

  getPlace(id: number): Observable<PlaceModel> {
    return this._http.get<PlaceModel>(`${this.URL_API}/${id}`);
  }
  
  getPlaces(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>(`${this.URL_API}`);
  }

  deletePlace(id: number,): Observable<PlaceModel> {
    return this._http.delete<PlaceModel>(`${this.URL_API}/${id}`);
  }


}
