import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdMasculinoPage } from './prod-masculino.page';

const routes: Routes = [
  {
    path: '',
    component: ProdMasculinoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProdMasculinoPage]
})
export class ProdMasculinoPageModule {}
