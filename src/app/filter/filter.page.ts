import { Component } from '@angular/core';
import { FilterOption, FilterServiceService, defaultFilter } from '../filter-service.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-filter',
  templateUrl: 'filter.page.html',
  styleUrls: ['filter.page.scss']
})
export class FilterPage {
  parameters:FilterOption = defaultFilter();

  constructor( private filterservice:FilterServiceService) {}

  updateFilter(){
    this.filterservice.updateFilter(this.parameters)
  }

}
