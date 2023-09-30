import { Aluno } from "../Aluno/aluno.js";
import { ServicoError } from "./ServiceError.js";
import { BASE_API } from "./ApiService.js";

let resposta: Response;

export type Compra = {
  ano: number;
  valor: number;
}

export class ServicoAluno{

    async login(formData: FormData): Promise<Aluno> {
        try {
          const resposta = await fetch(`${BASE_API}login`, {
            method: 'POST',
            body: formData
          });

          if (resposta.status === 401) {
            throw new Error("Login ou senha inválido(s). " + resposta.status);
          }

          if (!resposta.ok) {
            throw new Error("Erro ao realizar login. " + resposta.status);
          }

          return resposta.json() as Promise<Aluno>;

        } catch (error) {
          if (error instanceof Error) {
            throw new ServicoError(
              `Erro ao realizar login. ${error.message}`
            );
          } else {
            throw new ServicoError(
              `Erro ao realizar login. Erro desconhecido.`
            );
          }
        }
      }

    async logout(): Promise<string> {
        try {
          const resposta = await fetch(`${BASE_API}logout`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            }
          });

          if (!resposta.ok) {
            throw new Error(`Erro ao finalizar sessão. ${resposta.status}`);
          }

          Aluno.logout();
          return resposta.json() as Promise<string>;

        } catch (error) {
          if (error instanceof Error) {
            throw new ServicoError(
              `Erro ao finalizar sessão. ${error.message}`
            );
          } else {
            throw new ServicoError(
              `Erro ao finalizar sessão. Erro desconhecido.`
            );
          }
        }
      }



  async obterDadosAluno(): Promise<Aluno> {

    try {
        resposta = await fetch(`${BASE_API}aluno`);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar aluno: " + resposta.status);
          }

          return resposta.json() as Promise<Aluno>;

      } catch (error) {
      if (error instanceof Error) {
        throw new ServicoError(
          `Erro ao consultar aluno. O servidor não pôde ser alcançado. ${error.message}`
        );
      } else {
        throw new ServicoError(
          `Erro ao consultar aluno. Erro desconhecido.`
        );
      }
  }

}

async validarSessao(exibirNome: void): Promise<string> {
  try {
    const resposta = await fetch(`${BASE_API}sessao`, {
      method: 'GET',
    });

    if (resposta.status === 401) {
      exibirNome;
      Aluno.expirarCookie();
    }else
      if (!resposta.ok) {
      Aluno.expirarCookie();
      throw new Error("Erro ao validar sessão: " + resposta.status);
    }

    const conteudo = await resposta.text();

    return conteudo;
  } catch (error) {
    if (error instanceof Error) {
      throw new ServicoError(
        `Erro. ${error.message}`
      );
    } else {
      throw new ServicoError(
        `Erro desconhecido.`
      );
    }
  }
}

}
