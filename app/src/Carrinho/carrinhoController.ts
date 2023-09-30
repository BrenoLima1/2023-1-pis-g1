import { Carrinho } from "./carrinho.js";
import { CarrinhoView } from "./carrinhoView.js";

export class CarrinhoController{
    private carrinhoView: CarrinhoView;

    constructor() {
        this.carrinhoView = new CarrinhoView();
    }

    public adicionarProduto(){
        this.carrinhoView.adicionarProduto(new Carrinho());
    }

    public exibirProdutos(){
        this.carrinhoView.preencherTabelaCarrinho(new Carrinho());
    }

    public exibirBotao(){
        this.carrinhoView.exibirBotaoCompra(new Carrinho());
    }

    public removerProdutos(){
        this.carrinhoView.removerProdutos(new Carrinho());
    }

    public exibirTotalItens(){
        this.carrinhoView.exibirQuantidadeProdutos(new Carrinho());
    }

    public realizarCompra(){
        this.carrinhoView.realizarCompra(new Carrinho());
    }
}
