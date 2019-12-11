import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../model/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Favoritos } from '../model/favoritos';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  listaProduto :Produto[] = [];
  favoritos : Favoritos = new Favoritos();
  total : number;

  constructor(private db: AngularFirestore,
     private router : Router,private fireStorage : AngularFireStorage,
     private fav : FavoritosService) { // Injeta o Carrinho Service
      
      // Evitar erro de inicializar o carrinho null
      this.favoritos.items = [];
      
      // Se o favoritos for nulo
      if(this.fav.getFav()==null){
        this.favoritos.items = []; // Cria um favoritos
      }else{
        this.favoritos = this.fav.getFav(); // pega o favoritos criado
      }
      
      // Calcula o total
      //this.total = this.fav.total();

      
}

ngOnInit(){
  if(this.fav.getFav()==null){
    this.favoritos.items = [];
  }else{
    this.favoritos = this.fav.getFav();
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

  removeProduto(produto : Produto) : Favoritos{
    let fav = this.fav.getFav();
    // Verifica se existe o produto no carrinho

    let position = fav.items.findIndex(x => x.produto.id==produto.id);
    if(position!= -1){ // -1 -> Não existe
        fav.items.splice(position,1);
        this.favoritos.items.splice(position,1); // exclui o item carrinho
    }
    this.fav.setFav(fav); // atualiza o carrinho
    return fav;
}
}