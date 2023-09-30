import { Pedido } from "../Pedido/pedido.js";
import { ServicoError } from "./ServiceError.js";
import { BASE_API } from "./ApiService.js";
import { Carrinho } from "../Carrinho/carrinho.js";
import { CarrinhoView } from "../Carrinho/carrinhoView.js";

let carrinho:Carrinho = new Carrinho();
let resposta: Response;
export class ServicoPedido{
    async obterDadosPedido(): Promise<Pedido[]> {

        try {
            resposta = await fetch(`${BASE_API}pedido`);

            if (!resposta.ok) {
                throw new Error("Erro ao consultar pedido: " + resposta.status);
              }

              return resposta.json() as Promise<Pedido[]>;

          } catch (error) {
          if (error instanceof Error) {
            throw new ServicoError(
              `Erro ao consultar pedido. O servidor não pôde ser alcançado. ${error.message}`
            );
          } else {
            throw new ServicoError(
              `Erro ao consultar pedido. Erro desconhecido.`
            );
          }
      }
    }

    async realizarCompra(formData:FormData): Promise<void> {

      try {
          resposta = await fetch(`${BASE_API}comprar`, {
            method: 'POST',
            body: formData
          });
          const carrinhoView: CarrinhoView = new CarrinhoView();
          debugger;
          const data = await resposta.json();
          if (resposta.status == 422) {
            debugger;
            const descricao = carrinho.obterDescricaoProduto(data.message);
            carrinho.removerProduto(data.message);
            carrinhoView.removerProdutoPorID(carrinho,data.message);
            throw new Error( `O item ${descricao} foi removido do seu carrinho, por falta de estoque. Para comprá-lo, tente adicioná-lo novamente`);
          }else
          if (resposta.status == 402) {
            debugger;
            const status = resposta.status;
            throw new Error(`Você não possui saldo suficiente para concluir a compra. Tente remover um ou mais itens e tente novamente`);
          }else
          if (resposta.status == 409) {
            debugger;
            const descricao = carrinho.obterDescricaoProduto(data);
            carrinho.removerProduto(data);
            carrinhoView.removerProdutoPorID(carrinho,data);
            throw new Error(`Houve uma alteração no valor do produto ${descricao}. Caso deseje obtê-lo, adicione-o novamente ao seu carrinho`);
          }

          else
          if (!resposta.ok) {
            const status = resposta.status;
            throw new Error(`Erro ao realizar compra: ${status}`);
          }

          //return resposta.json() as Promise<Pedido[]>;

        } catch (error) {
        if (error instanceof Error) {
          throw new ServicoError(
            ` ${error.message}`
          );
        }
    }
  }
    async validarQuantidadeProduto(formData:FormData): Promise<void> {

      try {
        resposta = await fetch(`${BASE_API}validar_quantidade`, {
          method: 'POST',
          body: formData
        });

        if (resposta.status == 404) {
          const data = await resposta.json();
          alert( `O item  ${data.descricao} foi removido`);
        }else
        if (!resposta.ok) {
            throw new Error("Erro ao realizar compra: " + resposta.status);
        }


      } catch (error) {
      if (error instanceof Error) {
        throw new ServicoError(
          `Erro ao realizar compra. O servidor não pôde ser alcançado. ${error.message}`
        );
      } else {
        throw new ServicoError(
          `Erro ao realizar compra. Erro desconhecido.`
        );
      }
  }
  }


  // verificarEstoqueDosItensERemover = async () => {
  //   const carrinho = this.pegaCarrinhoDaLocalStorage();
  //   for (const item of carrinho) {
  //     const produto = await this.produtoRepositorio.obterPorId(item.id);
  //     if (produto.quantidade < item.quantidade) {
  //       this.removerProdutoDoCarrinho(item.id);
  //       this.visaoProdutoEmCarrinho.exibirMensagemItensRemovidos(
  //         item.descricao
  //       );
  //     }
  //   }
  // };
}
