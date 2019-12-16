import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Carrinho } from '../model/carrinho';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-prod-infantil',
  templateUrl: './prod-infantil.page.html',
  styleUrls: ['./prod-infantil.page.scss'],
})
export class ProdInfantilPage implements OnInit {

  listaProduto :Produto[] = [];
  carrinho : Carrinho = new Carrinho();
  imagem: any;
  idImage: string;
 



  constructor(private db: AngularFirestore,
     private router : Router,
     private fireStorage : AngularFireStorage,
     private car : CarrinhoService) {

      this.carrinho.items = [];

      if(this.car.getCart()==null){
        this.carrinho.items = [];
      }else{
        this.carrinho = this.car.getCart();
      }

      

}

ngOnInit(){
  this.db.collection('produto' , ref => ref.where('genero', '==', 'infantil')).snapshotChanges().subscribe(response=>{ 
    this.listaProduto = []; // limpando a lista
    // forEach equivalente ao for, percorre todos os elementos do firebase
    // cada um se chama doc, ou seja, converter um doc em Produtos.
    response.forEach(doc=>{ 
      let p = new Produto(); // Cria um novo objeto Produtos
      p.setProduto(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em Produtos
      let ref = this.fireStorage.storage.ref().child(`produto/${p.id}.jpg`);
      ref.getDownloadURL().then(url => {
      p.imagem = url;
      })
      this.listaProduto.push(p); // adiciona este servicos a lista
      console.log(this.listaProduto)
    },err=>{ // Em caso de erro, executa esssa linha
      console.log(err);
    })
  });

  console.log(this.listaProduto)
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
