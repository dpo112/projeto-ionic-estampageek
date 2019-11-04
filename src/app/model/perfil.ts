export class Perfil{
    
    id : string;
    nomeCompleto : string;
    senha: string;
    email : string;
    dataNascimento : string;
    telefone : string;
    cpf : string;

    setPerfil(obj : any, id : any){
        this.id = id;
        this.nomeCompleto = obj.nomeCompleto;
        this.senha = obj.senha;
        this.email = obj.email;
        this.dataNascimento = obj.dataNascimento;
        this.telefone = obj.telefone;
        this.cpf = obj.cpf;

    }
}