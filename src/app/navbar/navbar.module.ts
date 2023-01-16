import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { IonicModule, IonToolbar } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,IonicModule,RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
