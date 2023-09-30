import { AlunoView } from "./alunoView.js";
import { ServicoAluno, Compra } from "../Services/AlunoService.js";
import { Aluno } from "./aluno.js";
import { PedidoController } from "../Pedido/pedidoController.js";
export class AlunoController{
    private alunoView: AlunoView;
    private servicoAluno: ServicoAluno;

    constructor() {
        this.alunoView = new AlunoView();
        this.servicoAluno = new ServicoAluno();
    }

    async login(): Promise<void> {
      let formData: FormData;

      if (this.alunoView.validarFormulario()) {
        formData = this.alunoView.dadosFormulario();
      } else {
        return;
      }

      try {
        const aluno: Aluno = await this.servicoAluno.login(formData);

        if (aluno) {
          Aluno.salvarNomeLocalmente(JSON.stringify(aluno));
          this.alunoView.redirecionarParaCarrinho();
        }
      } catch (erro) {
        if (erro instanceof Error) {
          this.alunoView.exibirMensagem(erro.message);
        } else {
          this.alunoView.exibirMensagem("Erro desconhecido");
        }
      }
    }

    async obterDadosAluno(): Promise<void> {
         try {
           const aluno: Aluno = await this.servicoAluno.obterDadosAluno();
           this.exibirNomeAlunoConta();
           this.alunoView.exibirAluno(aluno);
           if(aluno){
            const pedidoController = new PedidoController();
            pedidoController.obterDadosPedido();
           }
          } catch (erro: unknown) {
            if (erro instanceof Error) {
              this.alunoView.exibirMensagem(erro.message);
            } else {
              this.alunoView.exibirMensagem("Erro desconhecido");
            }
          }
      }

      async validarSessao(): Promise<void> {
        try {
          this.alunoView.removerItensMenuDropDown();
          this.alunoView.alterarRedirecionamentoLogin();
          const validacao: string = await this.servicoAluno.validarSessao(this.alunoView.exibirNomeAluno());
        } catch (erro) {
          if (erro instanceof Error) {
            this.alunoView.exibirMensagem(erro.message);
          } else {
            this.alunoView.exibirMensagem("Erro desconhecido");
          }
        }
      }

      public exibirNomeAluno(){
        if(Aluno.validarCookie()){
          this.alunoView.exibirNomeAluno();
        }
      }

      public exibirNomeAlunoConta(){
        this.alunoView.exibirNomeAlunoConta();
      }

      async logout(): Promise<void> {
        try {
          await this.servicoAluno.logout();
          window.location.href = 'index.html';
        } catch (erro) {
          if (erro instanceof Error) {
            this.alunoView.exibirMensagem(erro.message);
          } else {
            this.alunoView.exibirMensagem("Erro desconhecido");
          }
        }
      }


}
