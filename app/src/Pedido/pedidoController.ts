import { PedidoView } from "./pedidoView.js";
import { ServicoPedido } from "../Services/PedidoService.js";
import { Pedido } from "./pedido.js";
import { Carrinho } from "../Carrinho/carrinho.js";
import { CarrinhoView } from "../Carrinho/carrinhoView.js";
export class PedidoController{
    private pedidoView: PedidoView;
    private servicoPedido: ServicoPedido;
    private carrinho: Carrinho;
    private carrinhoview: CarrinhoView;

    constructor() {
        this.pedidoView = new PedidoView();
        this.servicoPedido = new ServicoPedido();
        this.carrinho = new Carrinho();
        this.carrinhoview = new CarrinhoView();
    }

    async obterDadosPedido(): Promise<void> {
      try {
        const pedidos: Pedido[] = await this.servicoPedido.obterDadosPedido();
        this.pedidoView.exibirPedido(pedidos);
      } catch (erro: unknown) {
        if (erro instanceof Error) {
          this.pedidoView.exibirMensagem(erro.message);
        } else {
          this.pedidoView.exibirMensagem("Erro desconhecido");
        }
      }
    }

    async realizarCompra(produtos : string){
      try {
        const formData: FormData = new FormData();
        formData.append("produtosJson", produtos);
        await this.servicoPedido.realizarCompra(formData);
        this.pedidoView.exibirMensagem("Compra Finalizada!");
        this.carrinho.limparCarrinho();
        this.carrinhoview.limparCarrinho();
      } catch (erro: unknown) {
        if (erro instanceof Error) {
          this.pedidoView.exibirMensagem(erro.message);
        } else {
          this.pedidoView.exibirMensagem("Erro desconhecido");
        }
      }
    }
}
