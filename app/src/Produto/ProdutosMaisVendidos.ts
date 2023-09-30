import { ProdutoController } from "./produtoController.js";
import { CarrinhoController } from "../Carrinho/carrinhoController.js";
import { AlunoController } from "../Aluno/alunoController.js";

const  carrinhoController = new CarrinhoController();
const produtoController: ProdutoController = new ProdutoController();
const alunoController = new AlunoController();

carrinhoController.exibirTotalItens();
produtoController.exibirProdutos();
alunoController.validarSessao();
