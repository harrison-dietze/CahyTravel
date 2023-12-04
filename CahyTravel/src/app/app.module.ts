import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from 'src/services/services.module';
import { ValeDoCaiModule } from './modules/vale-do-cai/vale-do-cai.module';

@NgModule({
  declarations: [AppComponent],
  imports: [ServicesModule, BrowserModule, AppRoutingModule, ValeDoCaiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
