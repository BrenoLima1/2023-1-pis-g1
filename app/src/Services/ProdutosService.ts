import { Produto } from "../Produto/produto.js";
import { BASE_API } from "./ApiService.js";
import { ServicoError } from "./ServiceError.js";

let resposta: Response;

export type ProdutosPaginados = {
    produtos: Produto[];
    totalPaginas: number;
};

  export class ServicoProdutos {

      async produtosMaisVendidos(): Promise<Produto[]> {

          try {
              resposta = await fetch(`${BASE_API}mais_vendidos`);

              if (!resposta.ok) {
                  throw new Error("Erro ao consultar produtos: " + resposta.status);
                }

                return resposta.json() as Promise<Produto[]>;

            } catch (error) {
            throw new ServicoError(
                `Erro ao consultar os produtos. O servidor não pôde ser alcançado. ${resposta.status}`
            );
        }


    }

      async produtoPeloID(id: number): Promise<Produto[]> {

          try {
              resposta = await fetch(`${BASE_API}produto/${id}`);

              if (!resposta.ok) {
                  throw new Error("Erro ao consultar produto: " + resposta.status);
                }

                return resposta.json() as Promise<Produto[]>;

            } catch (error) {
            throw new ServicoError(
                `Erro ao consultar produto. O servidor não pôde ser alcançado. ${resposta.status}`
            );
        }

    }

    async obterProdutos(pagina: number): Promise<ProdutosPaginados>{

        try {
            const resposta = await fetch(`${BASE_API}produtos?pagina=${pagina}`);

            if (!resposta.ok) {
                throw new Error("Erro ao consultar produto: " + resposta.status);
              }

            return resposta.json();

        } catch (error) {
            throw new ServicoError(
                `Erro ao consultar produtos. O servidor não pôde ser alcançado. ${resposta.status}`
            );
        }
    }

}
