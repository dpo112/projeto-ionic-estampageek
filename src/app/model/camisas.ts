export class Camisa{
    id : string;
    nomeCamisa : string;
    preco : string;
    tamanho : string;
    descricao : string;

    setCamisa(obj : any, id : any){
        this.id = id;
        this.nomeCamisa = obj.nomeCamisa;
        this.preco = obj.preco;
        this.tamanho = obj.tamanho;
        this.descricao = obj.descricao;

    }

}