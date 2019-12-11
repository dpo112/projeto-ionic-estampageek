import { Component, OnInit } from '@angular/core';
import { Carrinho } from '../model/carrinho';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-endereco-lista',
  templateUrl: './endereco-lista.page.html',
  styleUrls: ['./endereco-lista.page.scss'],
})
export class EnderecoListaPage implements OnInit{

  carrinho : Carrinho = new Carrinho();

  constructor(private router : Router,
              private car : CarrinhoService){

    this.carrinho.items = [];

      if(this.car.getCart()==null){
        this.carrinho.items = [];
      }else{
        this.carrinho = this.car.getCart();
      }
  }

  ngOnInit(){
    
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
}
