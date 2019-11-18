import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutoCadastroPage } from './produto-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoCadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ProdutoCadastroPage]
})
export class ProdutoCadastroPageModule {}
