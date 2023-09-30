import { Aluno } from "../Aluno/aluno.js";
import { GenericView } from "../Generic/generic-view.js";
export class AlunoView extends GenericView{

    public dadosFormulario(){
        const form: HTMLFormElement = document.querySelector("form")! as HTMLFormElement;
        let formData = new FormData(form);
        return formData;
    }

    public validarFormulario(): Boolean{
        const inputLogin: HTMLInputElement = document.getElementById('login')! as HTMLInputElement;
        const inputSenha: HTMLInputElement = document.getElementById('senha')! as HTMLInputElement;

        if (!inputLogin.value) {
            alert('Insira seu login (matrícula ou e-mail institucional).');
            return false;
        }else if (!inputSenha.value) {
            alert('Insira sua senha.');
            return false;
        }

        return true;
    }

    public redirecionarParaCarrinho(){
        window.location.href = 'carrinho.html';
    }

    public redirecionarParaLogin(){
        window.location.href = 'login.html';
    }

    public redirecionarParaIndexSeLogin() {
        if (Aluno.validarNome() && Aluno.validarCookie()) {
            window.location.href = 'index.html';
            }
      }

    public exibirAluno(aluno:Aluno){
        const matricula = document.getElementById('matricula')!;
        const nome = document.getElementById('nome')!;
        const saldo = document.getElementById('saldo')!;

        matricula.textContent = aluno.matricula;
        nome.textContent = aluno.nome;
        saldo.textContent = '$C ' + aluno.saldo;
    }


    public exibirNomeAluno(): void{
        if (Aluno.validarNome() && Aluno.validarCookie()) {
            const nome: string = Aluno.obterNome();
            document.getElementById('botaoEntrar')!.textContent = `Olá, ${nome}`;
        }else{
            document.getElementById('botaoEntrar')!.textContent = 'Entrar';
        }

    }

    public exibirNomeAlunoConta(): void{
        if (Aluno.validarNome() && Aluno.validarCookie()) {
            const nome: string = Aluno.obterNome();
            document.getElementById('botaoMenu')!.textContent = `Olá, ${nome}`;
        }
    }

    public finalizarSessao(funcao: void){
        const ancoraLogout: HTMLAnchorElement = document.getElementById('sair')! as HTMLAnchorElement;
        ancoraLogout.addEventListener('click',()=>{
            funcao;
        })
    }

    public removerItensMenuDropDown(){
        if (!Aluno.validarNome() && !Aluno.validarCookie()) {
        const divDropDown: HTMLDivElement = document.getElementById('dropdownLogin')! as HTMLDivElement;
        divDropDown.remove();
        }
    }

    public alterarRedirecionamentoLogin(){
        if (Aluno.validarNome() && Aluno.validarCookie()) {
            const ancoraLogin: HTMLAnchorElement = document.getElementById('botaoLogin')! as HTMLAnchorElement;
            ancoraLogin.removeAttribute('href');
            }
    }

}
