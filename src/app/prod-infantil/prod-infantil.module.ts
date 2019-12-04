import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdInfantilPage } from './prod-infantil.page';

const routes: Routes = [
  {
    path: '',
    component: ProdInfantilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProdInfantilPage]
})
export class ProdInfantilPageModule {}
