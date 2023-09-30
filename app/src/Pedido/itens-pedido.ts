export class ItensPedido{
    public imagem: string;
    public descricao: string;
	public desconto_original: number;
    public preco_original: number;
    public quantidade_comprada: number;

    public constructor(imagem: string,descricao: string,desconto_original: number,preco_original : number,quantidade_comprada: number) {
        this.imagem = imagem;
        this.descricao = descricao;
        this.desconto_original = desconto_original;
        this.preco_original = preco_original;
        this.quantidade_comprada = quantidade_comprada;
    }
}
