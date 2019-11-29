import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Clientes } from '../model/clientes';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    formGroup : FormGroup;
    id : string;
    clientes : Clientes = new Clientes();
    imagem: any; 
  
    constructor(private formBuild : FormBuilder,
      private auth : AngularFireAuth,
      private db : AngularFirestore,
      private fireStorage : AngularFireStorage,
      private toastCtrl: ToastController,
      private loadingController: LoadingController) { 

        this.formGroup = this.formBuild.group({
            nomeCompleto : ['', Validators.required],
            senha : ['', Validators.required],
            email : ['', Validators.required],
            dataNascimento : ['', Validators.required],
            telefone : ['', Validators.required],
            cpf : ['', Validators.required],
        });

        this.auth.user.subscribe(resp =>{
          this.loadClientes();
          this.downloadImage();
        })
      }

 
  loadClientes(){
    this.db.collection('clientes')
    .doc(this.id).get().subscribe(response =>{
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

  atualizar(){

    this.db.collection('clientes')
    .doc(this.id)
      .set(this.formGroup.value)
        .then(() =>{
          console.log('Atualizado com sucesso')
        }).catch(() =>{
          console.log('Erro ao atualizar');
        })
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
}
