export class Clientes{
    
    id : string;
    nomeCompleto : string;
    cpf : string;
    dataNascimento : string;
    telefone : string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    

    setClientes(obj : any){
        this.id = obj.id;
        this.nomeCompleto = obj.nomeCompleto;
        this.cpf = obj.cpf;
        this.dataNascimento = obj.dataNascimento;
        this.telefone = obj.telefone;
        this.cep = obj.cep;
        this.endereco = obj.endereco;
        this.numero = obj.numero;
        this.complemento = obj.complemento;
        this.bairro = obj.bairro;
        this.cidade = obj.cidade;
        
    }
}