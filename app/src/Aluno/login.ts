import { CarrinhoController } from "../Carrinho/carrinhoController.js";
import { AlunoController } from "./alunoController.js";
import { AlunoView } from "./alunoView.js";

const alunoView = new AlunoView();
const alunoController = new AlunoController();
const carrinhoController = new CarrinhoController();
const botaoEntrar: HTMLButtonElement = document.getElementById('entrar')! as HTMLButtonElement;

alunoView.redirecionarParaIndexSeLogin();
carrinhoController.exibirTotalItens();

botaoEntrar.addEventListener('click', (event)=>{
    event.preventDefault();
    alunoController.login();
})
