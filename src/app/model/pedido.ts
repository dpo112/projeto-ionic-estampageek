export class Pedido{
    id : string;
    nomeProduto : string;
    preco : string;

setPedido(obj : any, id : any){
    this.id = id;
    this.nomeProduto = obj.nomeProduto;
    this.preco = obj.preco;
  }
}