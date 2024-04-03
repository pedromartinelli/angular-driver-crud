import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  { path: 'usuarios', component: UserComponent },
  { path: 'carros', component: CarComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
