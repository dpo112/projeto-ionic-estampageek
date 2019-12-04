import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.page.html',
  styleUrls: ['./produto-cadastro.page.scss'],
})
export class ProdutoCadastroPage implements OnInit{
  
  formGroup :FormGroup;
  imagem: any;
  idImage : string;


  constructor(private formB : FormBuilder,
    private db: AngularFirestore,
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController){

    this.formGroup = this.formB.group({
      nomeProduto : ['',Validators.required],
      preco : ['',Validators.required],
      tamanho : ['',Validators.required],
      descricao : ['',Validators.required],
      categoria : ['',Validators.required],
      genero : ['',Validators.required],

    });
   }
  
  ngOnInit() {
  }
  cadastrar(){
    this.db.collection('produto')
    .add(this.formGroup.value).then(response =>{
      this.idImage = response.id;
      this.presentToast();
      this.uploadStorage();
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

    let urlImage = this.fireStorage.storage.ref().child(`produto/${this.idImage}.jpg`);
    urlImage.put(this.imagem).then(resp =>{
      this.downloadImage();
      loading.onDidDismiss();
    })
  }

  downloadImage(){
    let ref = this.fireStorage.storage.ref().child(`produto/${this.idImage}.jpg`);
    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }
  

}