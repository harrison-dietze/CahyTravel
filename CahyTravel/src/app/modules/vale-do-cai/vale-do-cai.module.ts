import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { CITY_GRAPH_TOKEN } from 'src/providables/city-set-token';
import { cityGraph } from 'src/constants/cities.mock';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule],
  exports: [MapComponent],
  providers: [{ provide: CITY_GRAPH_TOKEN, useValue: cityGraph }],
})
export class ValeDoCaiModule {}
