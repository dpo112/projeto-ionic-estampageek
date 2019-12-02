import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../model/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Carrinho } from '../model/carrinho';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  listaProduto :Produto[] = [];
  carrinho : Carrinho = new Carrinho();
  total : number;

  constructor(private db: AngularFirestore,
     private router : Router,private fireStorage : AngularFireStorage,
     private car : CarrinhoService) { // Injeta o Carrinho Service
      
      // Evitar erro de inicializar o carrinho null
      this.carrinho.items = [];
      
      // Se o carrinho for nulo
      if(this.car.getCart()==null){
        this.carrinho.items = []; // Cria um carrinho
      }else{
        this.carrinho = this.car.getCart(); // pega o carrinho criado
      }
      
      // Calcula o total
      this.total = this.car.total();

      
}

ngOnInit(){
  if(this.car.getCart()==null){
    this.carrinho.items = [];
  }else{
    this.carrinho = this.car.getCart();
  }
  
  }

  goPage(idValue : string){
    this.router.navigate(['produto-detalhes',{id : idValue}]);
  }

  goInicio(){
    this.router.navigate(['home']);
  }
  goListar(){
    this.router.navigate(['produto']);
  }
  goCart(){
    this.router.navigate(['carrinho']);
  }
  goPerf(){
    this.router.navigate(['perfil-lista']);
  }

  removeProduto(produto : Produto) : Carrinho{
    let cart = this.car.getCart();
    // Verifica se existe o produto no carrinho

    let position = cart.items.findIndex(x => x.produto.id==produto.id);
    if(position!= -1){ // -1 -> Não existe
        cart.items.splice(position,1);
        this.carrinho.items.splice(position,1); // exclui o item carrinho
    }
    this.car.setCart(cart); // atualiza o carrinho
    return cart;
}
}