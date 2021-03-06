import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { MDBBootstrapModule, CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { MoedasComponent } from './moedas/moedas.component'
// import { SlideshowModule } from 'ng-simple-slideshow';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MoedasComponent
  ],
  imports: [BrowserModule, MDBBootstrapModule, CarouselModule, WavesModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
