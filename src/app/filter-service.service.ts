import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import * as internal from 'stream';


@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  private filter$ = new BehaviorSubject<FilterOption>(defaultFilter());
  selectedFilter$ = this.filter$.asObservable();

  updateFilter(filter:FilterOption){
    this.filter$.next(filter);
  }

  constructor() { }

}

export interface FilterOption{
    price: number;
    openNow: boolean

}

export function defaultFilter(){
  var defaultFilter: FilterOption ={
    openNow: false,
    price: 1

  }
  return defaultFilter;
}
