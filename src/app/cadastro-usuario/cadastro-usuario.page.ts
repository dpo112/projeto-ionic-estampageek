import { Component, OnInit } from '@angular/core';
import { ToastController,} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit{

  email: string;
  senha: string;

constructor(public afAuth: AngularFireAuth,
    private router : Router,
    private toastCtrl : ToastController) { }

ngOnInit() {
  }

cadastrar(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.senha).then(()=>{
    this.presentToast('Login Cadastrado!');
    this.router.navigate(['/cadastro-dados']);
    }).catch(()=>{
    this.presentToast('Cadastro Inválido!');
  })    
}

async presentToast(msg : string){
    const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
 }

}

