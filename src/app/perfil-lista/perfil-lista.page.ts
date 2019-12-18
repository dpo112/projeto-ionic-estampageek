import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clientes } from '../model/clientes';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { Carrinho } from '../model/carrinho';
import { CarrinhoService } from '../services/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-lista',
  templateUrl: './perfil-lista.page.html',
  styleUrls: ['./perfil-lista.page.scss'],
})
export class PerfilListaPage implements OnInit {

  formGroup : FormGroup;
  id : string;
  email : string;
  clientes : Clientes = new Clientes();
  imagem: any; 
  carrinho : Carrinho = new Carrinho();

  constructor(private formBuild : FormBuilder,
    private auth : AngularFireAuth,
    private db : AngularFirestore,
    private fireStorage : AngularFireStorage,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private car : CarrinhoService,
    private router : Router,
    ) { 

      this.formGroup = this.formBuild.group({
          nomeCompleto : ['', Validators.required],
          senha : ['', Validators.required],
          email : ['', Validators.required],
          dataNascimento : ['', Validators.required],
          telefone : ['', Validators.required],
          cpf : ['', Validators.required],
      });

      this.auth.user.subscribe(resp =>{
        this.id = resp.uid;
        this.email = resp.email;
        this.loadClientes();
        this.downloadImage();
      })
      this.carrinho.items = [];

      if(this.car.getCart()==null){
        this.carrinho.items = [];
      }else{
        this.carrinho = this.car.getCart();
      }
    }


loadClientes(){
  this.db.collection('clientes').doc(this.id).get().subscribe(response =>{
    
    if(response.exists == false){
      this.nClientes();
    }else{
      this.clientes.setClientes(response.data());
    }
  })
}
nClientes(){
  let json = {
    nomeCompleto : "",
    senha : "",
    email : "",
    dataNascimento : "",
    telefone : "",
    cpf : "",

  }
  this.db.collection('clientes').doc(this.id).set(json).then(() =>{})

}

enviaArquivo(event){
  this.imagem = event.srcElement.files[0];
  this.uploadStorage();
}


async uploadStorage(){
  let loading = await this.loadingController.create({
    message: 'Carregando!',
    duration: 2000
  });

  await loading.present();

  let urlImage = this.fireStorage.storage.ref().child(`clientes/${this.id}.jpg`);
  urlImage.put(this.imagem).then(resp =>{
    this.downloadImage();
    loading.onDidDismiss();
  })
}

downloadImage(){
  let ref = this.fireStorage.storage.ref().child(`clientes/${this.id}.jpg`);
  ref.getDownloadURL().then(url => {
    this.imagem = url;
  })
}
ngOnInit() {

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
goPedidos(){
  this.router.navigate(['pedido-status']);
}

goDadosP(){
  this.router.navigate(['dados-pessoais']);
}

goEndereco(){
  this.router.navigate(['/endereco-lista']);
}

goNotifica(){
  this.router.navigate(['']);
}

goLogout(){
  this.router.navigate(['logoff']);
}
}
