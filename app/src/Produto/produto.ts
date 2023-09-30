export class Produto{
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    desconto_percentual: number;
    imagem: string;
    quantidade: number;
    data_lancamento : string;
    vendas: number;

    constructor(id: number, nome: string, descricao: string, preco: number, desconto_percentual: number, imagem: string, quantidade: number, data_lancamento: string, vendas: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.desconto_percentual = desconto_percentual;
        this.imagem = imagem;
        this.quantidade = quantidade;
        this.vendas = vendas;
        this.desconto_percentual = desconto_percentual;
        this.data_lancamento = data_lancamento;
    }

}
