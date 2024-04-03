import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { CarModule } from './car/car.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    MenubarModule,
    CarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
