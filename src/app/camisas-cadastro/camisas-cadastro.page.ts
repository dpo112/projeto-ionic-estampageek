import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-camisas-cadastro',
  templateUrl: './camisas-cadastro.page.html',
  styleUrls: ['./camisas-cadastro.page.scss'],
})
export class CamisasCadastroPage implements OnInit {
  
  // Não esquecer de declarar ReactiveFormsModule no module.ts
  formGroup :FormGroup;  // formulario de cadastro -> armazena todos os dados 
  imagem: any;



  constructor(private formB : FormBuilder, // Inicializar o formulario (obrigatorio para formGroup)
    private db: AngularFirestore, // Inicia o banco de dados do firebbase
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController) { // Exibir Mensagem


      // Inicializa o Formulário obrigatorio no construtor
    this.formGroup = this.formB.group({
      nomeCamisa : ['',Validators.required],
      preco : ['',Validators.required],
      tamanho : ['',Validators.required],
      descricao : ['',Validators.required],

    });
   }
  
  ngOnInit() {
  }
  cadastrar(){
    this.db.collection('camisas') // Seleciono a coleção do firebase
    .add(this.formGroup.value).then(() =>{ //.add realiza o cadastro, os dados do formGroup
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
  }

  

}
