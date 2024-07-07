import { Component } from '@angular/core';
import { PlacesService } from '../places.service';
import { Coordinates, LocationService } from '../location.service';
import { ToastController } from '@ionic/angular'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Place, PlaceResponse } from '../models';
import { DbService } from '../db.service';
import { FilterServiceService,FilterOption, defaultFilter } from '../filter-service.service';
import { filter } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // items = `  
  // [
  //   { Name: 'Mcdonalds', Category: 'Fast food',Address:"Street 1" },
  //   { Name: 'Toyo', Category: 'Japanese',Address:"Street 2"},
  //   { Name: 'Zap thai', Category: 'Thai',Address:"Street 3"},
  // ];

  constructor(
    private placesservice: PlacesService,
    private locationservice: LocationService,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private db: DbService,
    private filterservice:FilterServiceService,
    private formBuilder: FormBuilder) { 
      this.filterservice.selectedFilter$.subscribe((
        data:FilterOption) =>{
          console.warn(JSON.stringify(this.selectedFilter))
          this.selectedFilter = data;
          console.warn(JSON.stringify(this.selectedFilter))
        })

        this.form = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
        });
    }

  selectedFilter: FilterOption= defaultFilter();
  items: Place[] = [];
  loc: Coordinates | null = null;
  form:any
  place:string = ""


  

  async locateMe() {
    // console.log('me');
    this.loc= await this.locationservice.printCurrentPosition();
    console.log(this.loc);
    if (this.loc == null) {
      //console.log("bleh");
      const toast = await this.toastController.create({
        message: 'Location could not be retrieved, please enter manually in appropriate format.',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
    } else { 
      this.getStuff();
      //console.log("done");
      const toast = await this.toastController.create({
        message: 'Location retrieved successfully!',
        position: 'bottom',
        color: 'success',
        duration: 5000
      });
      toast.present();

    }
  }

  locateMe2() {
    // console.log('me');
    this.locationservice.printCurrentPosition()
      .then(loc => {



        console.log(loc);
        if (!loc) {
          console.log("bleh");
          const toast = this.toastController.create({
            message: 'Location not available',
            position: 'bottom',
            color: 'danger',
            duration: 2000
          })
            .then(toast => toast.present());

        }
      })
      .catch(err => console.warn(err))


  }
  async signout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true })
  }

  updateFavorites() {
    let favItems = this.items.filter(f => f.isFavorite)
    this.db.updateFavorites(favItems)
  }

  setFavorites() {
    this.db.getUserFavorite()?.subscribe({
      next: (favs: Place[]) => {
        if (this.items.length > 0) {
          favs.forEach(fav => {
            let placeIdx = this.items.findIndex(place => place.fsq_id == fav.fsq_id);
            if (placeIdx >= 0) {
              this.items[placeIdx].isFavorite = true;
            }
          });
        }
      },
      error: (e: any) => console.warn(e)
    })
  }

  getStuff() {
    if(this.place){
      this.placesservice.getPlaces2(this.place, this.selectedFilter)
      .subscribe((
        data: PlaceResponse) => {
        this.items = data.results;
        this.setFavorites() 
    });
  }
    else if (this.loc == null){
      return;
    }
    else{
    this.placesservice.getPlaces(this.loc.lat, this.loc.long, this.selectedFilter)
    .subscribe((
      data: PlaceResponse) => {
      this.items = data.results;
      this.setFavorites()
    });
  }
}


  async sendEmail() {
    try {
      await this.authService.forgotPassword(this.form.value.email);
      this.router.navigateByUrl('/login');
      const toast = await this.toastController.create({
        message: 'Check your email to reset password.',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
    } catch (error) {
      console.warn(error)
      const toast = await this.toastController.create({
        message: 'Ensure correct email address has been provided.',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
    }
  }

  gotoUpdate() {
    this.router.navigateByUrl('/forgot-pass');
  }

}
