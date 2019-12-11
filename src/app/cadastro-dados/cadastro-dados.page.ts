import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastro-dados',
  templateUrl: './cadastro-dados.page.html',
  styleUrls: ['./cadastro-dados.page.scss'],
})
export class CadastroDadosPage implements OnInit{
  
  formGroup :FormGroup; 

  constructor(private formB : FormBuilder,
    private db: AngularFirestore,
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController,
    private router : Router,
    public afAuth: AngularFireAuth){


    this.formGroup = this.formB.group({
      nomeCompleto : ['',Validators.required],
      dataNascimento : ['',Validators.required],
      cpf : ['',Validators.required],
      telefone : ['',Validators.required],
      endereco : ['',Validators.required],
      numero : ['',Validators.required],
      complemento : ['',Validators.required],
      cep : ['',Validators.required],
      bairro : ['',Validators.required],
      cidade : ['',Validators.required],



    });
   }
  
  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('clientes').add(this.formGroup.value).then(response =>{
    this.presentToast();
    }).catch(()=>{
      console.log("Erro ao Cadastrar")
    });
  
  }
  
  async presentToast(){
    const toast = await this.toastCtrl.create({
    message: 'Cadastro com sucesso',
    duration: 2000  
    });
    toast.present();
    this.router.navigate(['/home']) 
  }

}