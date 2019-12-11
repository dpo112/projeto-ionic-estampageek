import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Clientes } from '../model/clientes';

@Component({
  selector: 'app-cadastro-dados',
  templateUrl: './cadastro-dados.page.html',
  styleUrls: ['./cadastro-dados.page.scss'],
})
export class CadastroDadosPage implements OnInit{
  
  formGroup :FormGroup;  
  //cliente : Clientes = new Clientes();
  idUser : string;
  

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
      cidade : ['',Validators.required]


    });

    this.afAuth.user.subscribe(resp =>{
      this.idUser = resp.uid;
      this.db.collection('clientes').doc(this.idUser).get().subscribe(response=>{
        console.log(response.data());

        this.formGroup.controls['nomeCompleto'].setValue(response.data().nomeCompleto);
        this.formGroup.controls['dataNascimento'].setValue(response.data().dataNascimento);
        this.formGroup.controls['cpf'].setValue(response.data().cpf);
        this.formGroup.controls['telefone'].setValue(response.data().telefone);
        this.formGroup.controls['endereco'].setValue(response.data().endereco);
        this.formGroup.controls['numero'].setValue(response.data().numero);
        this.formGroup.controls['complemento'].setValue(response.data().complemento);
        this.formGroup.controls['cep'].setValue(response.data().cep);
        this.formGroup.controls['bairro'].setValue(response.data().bairro);
        this.formGroup.controls['cidade'].setValue(response.data().cidade);
        
        
        
        
        // cliente.nomeComplento = response.data().nomeCompleto
        // cliente.dataNascimento = response.data().dataNascimento
        },err=>{
          console.log(err);
        })
    });
   }
  
  ngOnInit() {


      
    


  }

  cadastrar(){
    this.db.collection('clientes').doc(this.idUser).set(this.formGroup.value).then(response =>{
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