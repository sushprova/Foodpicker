import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPage } from './filter.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FilterPageRoutingModule } from './filter-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FilterPageRoutingModule
  ],
  declarations: [FilterPage]
})
export class FilterPageModule {}
