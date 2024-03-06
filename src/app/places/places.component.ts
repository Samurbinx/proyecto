import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';
import { PlaceModel } from '../models/place.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit{

  places: PlaceModel[] | undefined;

  constructor(private _placeService: PlaceService){}
  
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

  truncateDescription(description: string): string {
    const words = description.split(' ');
    return words.slice(0, 50).join(' ') + '...';
  }

}
