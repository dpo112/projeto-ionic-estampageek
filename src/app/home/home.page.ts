import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';
import { CarrinhoService } from '../services/carrinho.service';
import { Item } from '../model/item';
import { FavoritosService } from '../services/favoritos.service';
import { Favoritos } from '../model/favoritos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  listaProduto : Produto [] = [];
  carrinho : Carrinho = new Carrinho();
  favoritos : Favoritos = new Favoritos();

  constructor(private db: AngularFirestore,
              private router : Router,
              private fireStorage : AngularFireStorage,
              private car : CarrinhoService,
              private fav : FavoritosService) {
                
                this.carrinho.items = [];

                if(this.car.getCart()==null){
                  this.carrinho.items = [];
                }else{
                  this.carrinho = this.car.getCart();
                }
    }
    ngOnInit(){
      this.db.collection('produto').snapshotChanges().subscribe(response=>{

      this.listaProduto = [];
      response.forEach(doc=>{

        let p = new Produto();
        p.setProduto(doc.payload.doc.data(),doc.payload.doc.id);
        
        let ref = this.fireStorage.storage.ref().child(`produto/${p.id}.jpg`);
        ref.getDownloadURL().then(url => {
          p.imagem = url;
          this.listaProduto.push(p);
        }).catch(()=>{
          p.imagem = "../../assets/camisa-preta.png";
          this.listaProduto.push(p);
        })
      },err=>{
        console.log(err);
      })
      console.log(this.listaProduto)
    });
    }
    goDetalhePage(idValue : string){
      this.router.navigate(['produto-detalhe',{id : idValue}]);
  }
    goListaPage(idValue : string){
      this.router.navigate(['produto',{id : idValue}]);
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

  addItem(p : Produto){


    if(this.car.getCart()==null){
      this.carrinho.items = [];
    }else{
      this.carrinho = this.car.getCart();
    }
  
    let item = new Item();
    item.produto = p;
    item.quantidade = 1;
    
    this.carrinho.items.push(item);
  
    this.car.setCart(this.carrinho);
  
    
  }
  addFav(p : Produto){


    if(this.fav.getFav()==null){
      this.favoritos.items = [];
    }else{
      this.favoritos = this.fav.getFav();
    }
  
    let item = new Item();
    item.produto = p;
    item.quantidade = 1;
    
    this.favoritos.items.push(item);
  
    this.fav.setFav(this.favoritos);
  
    
  }
 }
 