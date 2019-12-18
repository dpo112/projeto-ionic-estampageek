import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidoConfirmacaoPage } from './pedido-confirmacao.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoConfirmacaoPage
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
  declarations: [PedidoConfirmacaoPage]
})
export class PedidoConfirmacaoPageModule {}
