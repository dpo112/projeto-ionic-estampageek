import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Clientes } from '../model/clientes';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit{
  
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
      nome : ['',Validators.required],


    });

    this.afAuth.user.subscribe(resp =>{
      this.idUser = resp.uid;
      this.db.collection('favoritos').doc(this.idUser).get().subscribe(response=>{
        console.log(response.data());

        this.formGroup.controls['nome,0'].setValue(response.data().nomeCompleto);
        
        
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
    this.db.collection('favoritos').doc(this.idUser).set(this.formGroup.value).then(response =>{
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