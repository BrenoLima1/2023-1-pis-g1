import { AlunoController } from "../Aluno/alunoController.js";
import { CarrinhoController } from "./carrinhoController.js";

const carrinhoController = new CarrinhoController();
const alunoController = new AlunoController();

carrinhoController.exibirProdutos();
carrinhoController.exibirBotao();
carrinhoController.removerProdutos();
carrinhoController.realizarCompra();
alunoController.validarSessao();
