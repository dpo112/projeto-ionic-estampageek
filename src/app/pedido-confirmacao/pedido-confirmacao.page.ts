import { Component, OnInit } from '@angular/core';
import { Carrinho } from '../model/carrinho';
import { Clientes } from '../model/clientes';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pedido-confirmacao',
  templateUrl: './pedido-confirmacao.page.html',
  styleUrls: ['./pedido-confirmacao.page.scss'],
})
export class PedidoConfirmacaoPage implements OnInit{

  id : string;
  email : string;
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
