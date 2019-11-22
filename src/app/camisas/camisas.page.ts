import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Camisa } from 'src/app/model/camisas';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-camisas',
  templateUrl: './camisas.page.html',
  styleUrls: ['./camisas.page.scss'],
})
export class CamisasPage implements OnInit {

  listaCamisa : Camisa [] = []; // variavel para armazenar os clientes  (array)

  constructor(private db: AngularFirestore, //modulo de banco de dados
     private router : Router,private fireStorage : AngularFireStorage) {

    }
    ngOnInit(){
            //solicitar os dados de coleção clientes no firebase
    this.db.collection('camisas').snapshotChanges().subscribe(response=>{

      this.listaCamisa = [];

      //response retorna um objeto do firebase , precisamos converter em
      //um objeto cliente

      //forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja converter um doc em cliente
      response.forEach(doc=>{

        let f = new Camisa(); // Cria um novo objeto cliente
        f.setCamisa(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em Clientes
        
        
        let ref = this.fireStorage.storage.ref().child(`camisas/${f.id}.jpg`);
        ref.getDownloadURL().then(url => {
          f.imagem = url;
          this.listaCamisa.push(f);
        }).catch(()=>{
          f.imagem = "../../assets/camisa-preta.png";
          this.listaCamisa.push(f);
        })



      },err=>{ // em caso de erro, executa essa linha
        console.log(err);
      })
      console.log(this.listaCamisa)
    });
    }
    goPage(idValue : string){
      // Redireciona para ClienteDetalhes
      //enviando o id do cliente(idValue)
      this.router.navigate(['camisas-detalhes',{id : idValue}]);
  }


  
 }
