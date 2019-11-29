import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../model/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  listaProduto :Produto[] = [];

  constructor(private db: AngularFirestore,
     private router : Router,private fireStorage : AngularFireStorage) {

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
    this.router.navigate(['perfil']);
  }
}