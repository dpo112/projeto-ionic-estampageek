import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../model/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.page.html',
  styleUrls: ['./produto-detalhe.page.scss'],
})
export class ProdutoDetalhePage implements OnInit{

  id : string;
  formGroup : FormGroup;
  produto : Produto = new Produto();

constructor(private actRoute : ActivatedRoute,
  private formB : FormBuilder,
  private db: AngularFirestore,
  private toastCtrl : ToastController,
  private router : Router,
  private alertController : AlertController,
  private fireStorage : AngularFireStorage){

    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.formGroup = this.formB.group({

      nomeProduto : [],
      preco : [],
      tamanho : [],
      descricao : [],
      categoria : [],
    
    })
   }

ngOnInit() {
 
  this.db.collection("produto")
  .doc(this.id).get().subscribe(response=>{
    console.log(response.data())
    this.produto.id = this.id;
    this.produto.nomeProduto = response.data().nomeProduto;
    this.produto.preco = response.data().preco;
    this.produto.tamanho = response.data().tamanho;
    this.produto.descricao = response.data().descricao;
    this.produto.categoria = response.data().categoria;
    this.obterImagem();
  
  })
}

obterImagem(){
  let ref = this.fireStorage.storage.ref().child(`produto/${this.produto.id}.jpg`);
    ref.getDownloadURL().then(url => {
      this.produto.imagem = url;
          
}).catch(()=>{
  this.produto.imagem = "../../assets/camisa-preta.png";      
  })
}

atualizar(){

  this.db.collection('produto').doc(this.produto.id).set(this.formGroup.value).then(() =>{
    this.presentToast();
      }).catch(()=>{
        console.log('Erro ao Atualizar')
      })
      this.router.navigate(['/home']); 
}
excluir(){
  this.db.collection('produto').doc(this.produto.id).delete().then(()=>{
    this.router.navigate(['home'])
  })
}
async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Atualizado com sucesso',
    duration: 2000
  });
  toast.present();
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Deseja Excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluir()
          }
        }
      ]
    });

    await alert.present();
  }
 }