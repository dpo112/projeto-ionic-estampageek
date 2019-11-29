import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Produto } from '../model/produto';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit{

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
  this.router.navigate(['perfil']);
}
}