import { ProdutoController } from "./produtoController.js";
import { CarrinhoController } from "../Carrinho/carrinhoController.js";
import { AlunoController } from "../Aluno/alunoController.js";

const carrinhoController: CarrinhoController = new CarrinhoController();
const produtoController: ProdutoController = new ProdutoController();
const alunoController: AlunoController = new AlunoController();

carrinhoController.exibirTotalItens();
produtoController.exibirProdutosPaginados();
alunoController.validarSessao();
