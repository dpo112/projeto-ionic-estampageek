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
  idImage : string;


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
    .add(this.formGroup.value).then(response =>{ //.add realiza o cadastro, os dados do formGroup
      this.idImage = response.id;
      this.presentToast(); // Dadis cadastrados com sucesso
      this.uploadStorage();
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


  enviaArquivo(event){
    this.imagem = event.srcElement.files[0];
    
  }
  

  async uploadStorage(){
    let loading = await this.loadingController.create({
      message: 'Carregando!',
      duration: 2000
    });

    await loading.present();

    let urlImage = this.fireStorage.storage.ref().child(`camisas/${this.idImage}.jpg`);
    urlImage.put(this.imagem).then(resp =>{
      this.downloadImage();
      loading.onDidDismiss();
    })
  }

  downloadImage(){
    let ref = this.fireStorage.storage.ref().child(`camisas/${this.idImage}.jpg`);
    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }
  

}
