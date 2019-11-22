import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  listaProduto : Produto [] = [];

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
    goListaPage(idValue : string){
      this.router.navigate(['produto',{id : idValue}]);
  }
 
 }
 