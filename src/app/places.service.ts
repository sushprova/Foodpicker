import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceResponse } from './models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FilterOption } from './filter-service.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private myKey = environment.API_KEY;
  private apiUrl = 'https://api.foursquare.com/v3/places/search';
  
  constructor(private http: HttpClient) { }

  getPlaces(lat:String, long: string, selectedFilter: FilterOption ): Observable<PlaceResponse> {
    
    const searchParams = new URLSearchParams({
     ll: `${lat},${long}`,
     open_now: `${selectedFilter.openNow}`,
     price:`${selectedFilter.price}`,
    // open_now:'true',
     sort:'DISTANCE',
     limit:'50',
     categories:'13000'
    });

    const url = `${this.apiUrl}?${searchParams}`;
    console.log(url);
		return this.http.get<PlaceResponse>(url, {
			headers: {
				Accept: 'application/json',
				Authorization: this.myKey,
			},
    });

    
    //return this.http.get<PlaceResponse>('./assets/places.json')
   // return this.http.get<PlaceResponse>("https://api.foursquare.com/v3/places/search");
  }

  getPlaces2(place:string, selectedFilter: FilterOption ): Observable<PlaceResponse> {
    
    const searchParams = new URLSearchParams({
     //ll: `${lat},${long}`,
     near:`${place}`,
     open_now: `${selectedFilter.openNow}`,
     price:`${selectedFilter.price}`,
    // open_now:'true',
     sort:'DISTANCE',
     limit:'50',
     categories:'13000'
    });

    const url = `${this.apiUrl}?${searchParams}`;
    console.log(url);
		return this.http.get<PlaceResponse>(url, {
			headers: {
				Accept: 'application/json',
				Authorization: this.myKey,
			},
    });
  }
}
