import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { Camisa } from 'src/app/model/camisas';

@Component({
  selector: 'app-camisas-detalhes',
  templateUrl: './camisas-detalhes.page.html',
  styleUrls: ['./camisas-detalhes.page.scss'],
})
export class CamisasDetalhesPage implements OnInit {

    id : string; // armazena o id para consulta
    formGroup : FormGroup; // dados do formulário
    camisa : Camisa = new Camisa(); // armazena o Camisa da consulta

  constructor(private actRoute : ActivatedRoute, //captura o ID
    private formB : FormBuilder, // Inicializa o formulário
    private db: AngularFirestore, //banco de dados do firestone
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de paginas 
    private alertController : AlertController) {  //Exibe mensagem de confirmação
      

      // captura o id do Camisa
      this.id = this.actRoute.snapshot.paramMap.get('id');

      //inicializando o formulário
      this.formGroup = this.formB.group({

        nomeCamisa : [],
        preco : [],
        tamanho : [],
        descricao : [],
      
      })
     }

  ngOnInit() {
    // Carregar os dados do Camisa selecionado
    this.db.collection("camisas") // Seleciona a coleção Camisa do firebase
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o Camisa com base no id
      console.log(response.data())
      // atribuindo os dados do response para a variavel Camisa 
      this.camisa.id = this.id;
      this.camisa.nomeCamisa = response.data().nomeCamisa;
      this.camisa.preco = response.data().preco;
      this.camisa.tamanho = response.data().tamanho;
      this.camisa.descricao = response.data().descricao;

    
    })
  }
  atualizar(){
    //atualiza os dados do Camisa
    this.db.collection('camisas') //seleciona a coleção Camisa
    .doc(this.camisa.id) // seleciona pelo ID do Camisa
      .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
        .then(() =>{
          this.presentToast(); // Dados atualizados
        }).catch(()=>{
          console.log('Erro ao Atualizar') // Erro ao atualizar
        })
        this.router.navigate(['/home']); 
  }
  excluir(){
    this.db.collection('camisas') // seleciona a coleção Camisa
      .doc(this.camisa.id) // seleciona pelo ID do Camisa
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['home']) // redireciona para home
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

