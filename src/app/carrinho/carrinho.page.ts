import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../model/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Carrinho } from '../model/carrinho';
import { CarrinhoService } from '../services/carrinho.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  listaProduto :Produto[] = [];
  carrinho : Carrinho = new Carrinho();
  total : number;
  idUser : string;
  formGroup :FormGroup;

  constructor(private formB : FormBuilder,
     private db: AngularFirestore,
     private router : Router,
     private fireStorage : AngularFireStorage,
     private toastCtrl : ToastController,
     private car : CarrinhoService,
     public afAuth: AngularFireAuth) {
       
      this.formGroup = this.formB.group({
        nomeProduto : ['',Validators.required],
        preco : [this.total,Validators.required],});

      this.afAuth.user.subscribe(resp =>{
        this.idUser = resp.uid;
        this.db.collection('pedido').doc(this.idUser).get().subscribe(response=>{
        console.log(response.data());
    
        this.formGroup.controls['nomeProduto'].setValue(response.data().nomeProduto);
        this.formGroup.controls['preco'].setValue(response.data().preco);

      },err=>{
        console.log(err);
      })
  });

      // Injeta o Carrinho Service
      
      // Evitar erro de inicializar o carrinho null
      this.carrinho.items = [];
      
      // Se o carrinho for nulo
      if(this.car.getCart()==null){
        this.carrinho.items = []; // Cria um carrinho
      }else{
        this.carrinho = this.car.getCart(); // pega o carrinho criado
      }
      
      // Calcula o total
      this.total = this.car.total();

      
}

ngOnInit(){
  if(this.car.getCart()==null){
    this.carrinho.items = [];
  }else{
    this.carrinho = this.car.getCart();
  }
  
  }

  cadastrar(){
    this.db.collection('pedido').add(this.formGroup.value).then(response =>{
    this.presentToast();
    }).catch(()=>{
      console.log("Error 404")
    });
  
  }
  
  async presentToast(){
    const toast = await this.toastCtrl.create({
    message: 'Obrigado pela preferência',
    duration: 2000  
    });
    toast.present();
    this.router.navigate(['/pagamento-pay-pal']) 
  }


  goPage(idValue : string){
    this.router.navigate(['produto-detalhes',{id : idValue}]);
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

  removeProduto(produto : Produto) : Carrinho{
    let cart = this.car.getCart();
    // Verifica se existe o produto no carrinho

    let position = cart.items.findIndex(x => x.produto.id==produto.id);
    if(position!= -1){ // -1 -> Não existe
        cart.items.splice(position,1);
        this.carrinho.items.splice(position,1); // exclui o item carrinho
    }
    this.car.setCart(cart); // atualiza o carrinho
    return cart;
}
}