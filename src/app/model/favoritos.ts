export class Favoritos{
    id : string;
    nome : string;
    idUser : string;
    imagem: any;
    

    setFavoritos(obj : any, id : any){
        this.id = obj.id; // id do produto
        this.nome = obj.nome;
        this.idUser = id; // id do usuário

    }}