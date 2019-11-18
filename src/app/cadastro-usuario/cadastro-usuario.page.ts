import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  
  // Não esquecer de declarar ReactiveFormsModule no module.ts
  formGroup :FormGroup;  // formulario de cadastro -> armazena todos os dados 


  constructor(private formB : FormBuilder, // Inicializar o formulario (obrigatorio para formGroup)
    private db: AngularFirestore, // Inicia o banco de dados do firebbase
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController,
    private router : Router) { // Exibir Mensagem


      // Inicializa o Formulário obrigatorio no construtor
    this.formGroup = this.formB.group({
      nomeCompleto : ['',Validators.required],
      dataNascimento : ['',Validators.required],
      senha : ['',Validators.required],
      email : ['',Validators.required],
      cpf : ['',Validators.required],
      telefone : ['',Validators.required],
    });
   }
  
  ngOnInit() {
  }
  cadastrar(){
    this.db.collection('clientes') // Seleciono a coleção do firebase
    .add(this.formGroup.value).then(response =>{ //.add realiza o cadastro, os dados do formGroup
      this.presentToast(); // Dadis cadastrados com sucesso
    }).catch(()=>{
      console.log("Erro ao Cadastrar") // Erro
    });
    //then -> Sucesso
    //catch -> Erro
  }
  // Template para toastController
  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Cadastro com sucesso',
      duration: 2000  
    });
    toast.present();
    this.router.navigate(['login']) 
  }


}