import { Produto } from "./produto.js";
import { ProdutoView } from "./produtoView.js";
import { ServicoProdutos } from "../Services/ProdutosService.js";

export class ProdutoController {
  private produtoView: ProdutoView;

  constructor() {
    this.produtoView = new ProdutoView();
  }

  async exibirProdutos(): Promise<void> {
    const servico: ServicoProdutos = new ServicoProdutos();

    try {
      const produtos: Produto[] = await servico.produtosMaisVendidos();
      this.produtoView.exibirProdutos(produtos);
      this.produtoView.redirecionarParaProdutoComID();
      this.produtoView.redirecionarParaTodosProdutos();
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        this.produtoView.exibirMensagem(erro.message);
      } else {
        this.produtoView.exibirMensagem("Erro desconhecido");
      }
    }

  }

  async exibirProdutosPaginados(): Promise<void> {
    const servico: ServicoProdutos = new ServicoProdutos();

    try {
      let paginaAtual: number = Number(this.produtoView.obterNumeroPagina());
      const obj = await servico.obterProdutos(paginaAtual);
      this.produtoView.buscarProdutosPaginados(obj);
      this.produtoView.exibirProdutosPaginados(obj);
      this.produtoView.redirecionarParaProdutoComID();
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        this.produtoView.exibirMensagem(erro.message);
      } else {
        this.produtoView.exibirMensagem("Erro desconhecido");
      }
    }

  }

  obterIDProduto(){
    return this.produtoView.obterIDProduto();
  }

  async exibirProdutoPorId(id: number): Promise<void> {
    const servico: ServicoProdutos = new ServicoProdutos();

    try {
      const produto: Produto[] = await servico.produtoPeloID(id);
      this.produtoView.exibirProdutoComID(produto);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        this.produtoView.exibirMensagem(erro.message);
      } else {
        this.produtoView.exibirMensagem("Erro desconhecido");
      }
    }

  }
}
