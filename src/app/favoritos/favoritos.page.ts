import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Favoritos } from '../model/favoritos';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/produto'
import { CarrinhoService } from '../services/carrinho.service';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit{
  
  
  listaFavoritos :Favoritos[] = [];
  id : string;
  carrinho : Carrinho = new Carrinho();

  constructor(private formB : FormBuilder,
    private db: AngularFirestore,
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController,
    private router : Router,
    private car : CarrinhoService){
    
   }
  
  ngOnInit() {
    this.db.collection('favoritos').snapshotChanges().subscribe(response=>{
    this.listaFavoritos = [];

      response.forEach(doc=>{
      let f = new Favoritos();
      f.setFavoritos(doc.payload.doc.data(),doc.payload.doc.id);
      console.log(f.id)

      
      let ref = this.fireStorage.storage.ref().child(`produto/${f.id}.jpg`);
      ref.getDownloadURL().then(url => {
      
        f.imagem = url;
        this.listaFavoritos.push(f);
        

    }).catch(()=>{
      f.imagem = "../../assets/camisa-preta.png";
      this.listaFavoritos.push(f);
    })
    

    },err=>{
      console.log(err);
    })
    console.log(this.listaFavoritos)
    });
  }
  goDetalhePage(idValue : string){
    this.router.navigate(['produto-detalhe',{id : idValue}]);
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
  
  goProdMasculino(){
    this.router.navigate(['prod-masculino']);
  }
  
  goProdFeminino(){
    this.router.navigate(['prod-feminino']);
  }
  
  goProdInfantil(){
    this.router.navigate(['prod-infantil']);
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
  }