export class Clientes{
    
    id : string;
    nomeCompleto : string;
    senha: string;
    email : string;
    dataNascimento : string;
    telefone : string;
    cpf : string;

    setClientes(obj : any){
        this.id = obj.id;
        this.nomeCompleto = obj.nomeCompleto;
        this.senha = obj.senha;
        this.email = obj.email;
        this.dataNascimento = obj.dataNascimento;
        this.telefone = obj.telefone;
        this.cpf = obj.cpf;

    }
}