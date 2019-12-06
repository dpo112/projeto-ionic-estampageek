import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Clientes } from '../model/clientes';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage implements OnInit {
  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  clientes : Clientes = new Clientes();
  imagem: any; // armazena o cliente da consulta

constructor(private actRoute : ActivatedRoute, //captura o ID
  private formB : FormBuilder, // Inicializa o formulário
  private db: AngularFirestore, //banco de dados do firestone
  private toastCtrl : ToastController, // Exibe uma mensagem
  private router : Router, // Redirecionamento de paginas 
  private alertController : AlertController) {  //Exibe mensagem de confirmação
    

    // captura o id do cliente
    this.id = this.actRoute.snapshot.paramMap.get('id');

    //inicializando o formulário
    this.formGroup = this.formB.group({
      nomeCompleto : [],
      email : [],
      dataNascimento: [],
      telefone : [],
      cpf: [],
      
    })
    
   }

ngOnInit() {
  // Carregar os dados do Cliente selecionado
  this.db.collection("clientes") // Seleciona a coleção Cliente do firebase
  .doc(this.id).get().subscribe(response=>{ // .doc seleciona o cliente com base no id

    // atribuindo os dados do response para a variavel cliente 
  this.clientes.id = this.id;
  this.clientes.nomeCompleto = response.data().nomeCompleto;
  this.clientes.email = response.data().email;
  this.clientes.dataNascimento = response.data().dataNascimento;
  this.clientes.telefone = response.data().telefone;
  this.clientes.cpf = response.data().cpf;
  


  })
}

}
