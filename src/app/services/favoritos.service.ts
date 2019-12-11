import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/environments/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService{

  constructor() { }

  // pega o carrinho no localStorage
  getFav() : any{
    let str = localStorage.getItem("favoritos");// pego o valor no localStore
   
    if(str!==null){ // Existe carrinho
        return JSON.parse(str);
    }else{
        return [];
    }
}

// Adiciona carrinho 
setFav(obj : any){
    if(obj != null ){ // se o objeto for nulo
        localStorage.setItem("favoritos",JSON.stringify(obj));
    }else{ // armazenar no localStorage em formato Text (String)
        
        localStorage.removeItem("favoritos");
    }
}

total(){
    let fav = this.getFav();
    let sum = 0;
    for(var i = 0; i<fav.items.length; i++){
        sum += fav.items[i].produto.preco * fav.items[i].quantidade;
    }
    return sum;
}


 
}
