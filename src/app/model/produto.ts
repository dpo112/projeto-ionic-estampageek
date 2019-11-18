export class Produto{
    id : string;
    nomeProduto : string;
    preco : string;
    tamanho : string;
    descricao : string;
    categoria: string;
    imagem : any;

    setProduto(obj : any, id : any){
        this.id = id;
        this.nomeProduto = obj.nomeProduto;
        this.preco = obj.preco;
        this.tamanho = obj.tamanho;
        this.descricao = obj.descricao;
        this.categoria = obj.categoria;

    }

}