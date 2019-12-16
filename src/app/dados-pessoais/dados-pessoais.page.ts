import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Carrinho } from '../model/carrinho';
import { CarrinhoService } from '../services/carrinho.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Clientes } from '../model/clientes';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage implements OnInit {

  id : string;
  email : string;
  formGroup : FormGroup;
  carrinho : Carrinho = new Carrinho();
  cliente : Clientes = new Clientes();

  constructor(private actRoute : ActivatedRoute, 
    private auth : AngularFireAuth,
              private router : Router,
              private car : CarrinhoService,
              private formB : FormBuilder,
              private db: AngularFirestore,){

    this.carrinho.items = [];

    this.auth.user.subscribe(resp =>{
      this.id = resp.uid;
      this.email = resp.email;
      //this.loadClientes();
      //this.downloadImage();
      this.carregarDados();
      
    })
  }

  ngOnInit(){ 
    
  }

  carregarDados(){
    this.db.collection("clientes").doc(this.id).get().subscribe(response=>{
      //console.log(response);
    this.cliente.id = this.id;
    this.cliente.nomeCompleto = response.data().nomeCompleto;
    this.cliente.cpf = response.data().cpf;
    this.cliente.dataNascimento = response.data().dataNascimento;
    this.cliente.telefone = response.data().telefone;
    this.cliente.cep = response.data().cep;
    this.cliente.endereco = response.data().endereco;
    this.cliente.numero = response.data().numero;
    this.cliente.complemento = response.data().complemento;
    this.cliente.bairro = response.data().bairro;
    this.cliente.cidade = response.data().cidade;
    });
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

  goCadastroDados(){
    this.router.navigate(['cadastro-dados']);
  }

}
