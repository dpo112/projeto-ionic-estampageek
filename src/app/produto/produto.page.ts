import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Produto } from '../model/produto';
import { CarrinhoService } from '../services/carrinho.service';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit{

  listaProduto :Produto[] = [];
  carrinho : Carrinho = new Carrinho();
  id : string;
  constructor(private db: AngularFirestore,
    private auth : AngularFireAuth,
     private router : Router,
     private fireStorage : AngularFireStorage,
     private car : CarrinhoService) {

      this.carrinho.items = [];

      if(this.car.getCart()==null){
        this.carrinho.items = [];
      }else{
        this.carrinho = this.car.getCart();
      }

      this.auth.user.subscribe(resp =>{
        this.id = resp.uid;
      })

      

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

favoritoAdd(produto : Produto){

  let dados = {
    "id": produto.id,
    "nome": produto.nomeProduto,
    "idUser" : this.id
  }

  this.db.collection('favoritos')
    .add(dados).then(response =>{
        console.log(dados);
    }).catch(()=>{
      console.log("Erro ao Cadastrar")
    });
}

}