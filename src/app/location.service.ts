import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  printCurrentPosition = async () => {
    try {
      const pos = await Geolocation.getCurrentPosition();

      console.log('Current position:', pos);

      let coordinates: Coordinates = {
        lat: pos.coords.latitude.toFixed(2), long: pos.coords.longitude.toFixed(2)
      }

      return coordinates;
    } catch {
      return null;
    }

  };
}


export interface Coordinates {
  lat: string
  long: string
}


