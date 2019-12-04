import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdFemininoPage } from './prod-feminino.page';

const routes: Routes = [
  {
    path: '',
    component: ProdFemininoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProdFemininoPage]
})
export class ProdFemininoPageModule {}
