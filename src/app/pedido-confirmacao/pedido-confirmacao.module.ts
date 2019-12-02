import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoConfirmacaoPage]
})
export class PedidoConfirmacaoPageModule {}
