import { json } from "stream/consumers";

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  valor: number;
  imagem: string;
  descricao: string;
  desconto: number;
  total: number;
 }

export class Carrinho {
  private produtos: Array <string | number | object | any>;
  private CARRINHO: string = 'carrinho';

  constructor() {
    const carrinhoSalvo: string | null = localStorage.getItem(this.CARRINHO);
    if (carrinhoSalvo) {
      this.produtos = JSON.parse(carrinhoSalvo);
    } else {
      this.produtos = [];
    }
  }

  public adicionarProduto(id: number, nome: string, quantidade: number, valor: number, imagem: string, descricao: string, desconto: number, total: number): void {
    const produtoExistenteIndex = this.produtos.findIndex(produto => produto.id === id);

    if (produtoExistenteIndex !== -1) {
      this.produtos[produtoExistenteIndex].quantidade = quantidade;
    } else {
      const novoProduto: Produto = {
        id: id,
        nome: nome,
        quantidade: quantidade,
        valor: valor,
        imagem: imagem,
        descricao: descricao,
        desconto: desconto,
        total: total
      };
      this.produtos.push(novoProduto);
    }

    localStorage.setItem(this.CARRINHO, JSON.stringify(this.produtos));
  }



   public obterDescricaoProduto(id: number) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')!);
    const produto = carrinho.find((p: Produto) => Number(p.id) === Number(id));
    return produto.descricao;
   }

  public obterCarrinho(){
    return this.produtos;
  }

  public removerProduto(id: number): void {
    const produtoExistenteIndex = this.produtos.findIndex(produto => produto.id == id);

    if (produtoExistenteIndex !== -1) {
      this.produtos.splice(produtoExistenteIndex, 1);
      this.salvarNoLocalStorage();
    }
  }

   private salvarNoLocalStorage(): void {
    localStorage.setItem(this.CARRINHO, JSON.stringify(this.produtos));
  }

  public obterTotalItens(): number{
    return this.produtos.length;
  }

  public limparCarrinho(): void{
    localStorage.removeItem(this.CARRINHO);
  }

}
