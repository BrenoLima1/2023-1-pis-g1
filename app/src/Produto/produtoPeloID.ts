import { ProdutoController } from "./produtoController.js";
import { CarrinhoController } from "../Carrinho/carrinhoController.js";
import { AlunoController } from "../Aluno/alunoController.js";

const produtoController: ProdutoController = new ProdutoController();
const id: string =  produtoController.obterIDProduto();
const carrinhoController = new CarrinhoController();
const alunoController = new AlunoController();

produtoController.exibirProdutoPorId(Number (id));
carrinhoController.adicionarProduto();
carrinhoController.exibirTotalItens();
alunoController.validarSessao();
