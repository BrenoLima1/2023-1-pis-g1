import { PedidoController } from "../Pedido/pedidoController.js";
import { Carrinho } from "./carrinho.js";
import { Aluno } from "../Aluno/aluno.js";

export class CarrinhoView{


        public desenharTotalizacao( valorTotal: number ): void {
            const tds: NodeListOf <HTMLTableColElement> = document.querySelectorAll( 'tfoot td' ) as NodeListOf <HTMLTableColElement>;
            tds[ 1 ].textContent = String(valorTotal.toFixed(2));
        }

        public adicionarProduto(carrinho: Carrinho): void {
            const observarBotao = () => {
              const botaoAdicionar: HTMLButtonElement = document.getElementById('adicionar') as HTMLButtonElement;
              if (botaoAdicionar) {
                  botaoAdicionar.addEventListener('click', () => {
                  const inputIdProduto: HTMLInputElement = document.querySelector('input[type=hidden]')! as HTMLInputElement;
                  const tagNomeProduto: HTMLHeadElement = document.querySelector('h1')! as HTMLHeadElement;
                  const tagQuantidade: HTMLSelectElement = document.querySelector('select')! as HTMLSelectElement;
                  const tagValor: HTMLHeadElement = document.querySelector('h2')! as HTMLHeadElement;
                  const tagImgProduto: HTMLImageElement = document.querySelector('img')! as HTMLImageElement;
                  const tagDescricao: HTMLParagraphElement = document.querySelector('p')! as HTMLParagraphElement;
                  const tagDesconto : HTMLElement = document.getElementById('id-desconto')! as HTMLElement;

                  const idProduto = Number(inputIdProduto.value);
                  const nomeProduto: string = tagNomeProduto.textContent!;
                  const quantidade: number = Number(tagQuantidade.value);
                  const valor: number = Number(tagValor.textContent!.replace("$C ", ""));
                  const img: string = tagImgProduto.src;
                  const descricao: string = tagDescricao.textContent!;
                  const desconto : number = Number(tagDesconto.textContent?.split('%')[0]);

                  const total = valor * quantidade;

                  carrinho.adicionarProduto(idProduto, nomeProduto, quantidade, valor, img, descricao, desconto, total);
                  this.exibirQuantidadeProdutos(carrinho);
                });
              } else {
                setTimeout(observarBotao, 50);
              }
            };
            observarBotao();
          }

          public preencherTabelaCarrinho(carrinho: Carrinho): void{
            const produtos = carrinho.obterCarrinho();
            const tbody: HTMLTableSectionElement = document.querySelector('tbody')! as HTMLTableSectionElement;
            const tds: NodeListOf <HTMLTableColElement> = document.querySelectorAll( 'tfoot td' ) as NodeListOf <HTMLTableColElement>;
            let valorTotal: number = 0;


            for (const p of produtos) {
                const tr: HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
                const tdNomeProduto: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
                const tdQuantidadeProduto: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
                const tdValorTotalProduto: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
                const tdImagemProduto: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
                const imagemProduto: HTMLImageElement = document.createElement('img') as HTMLImageElement;
                const tdDescricaoProduto: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
                const aImg: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

                aImg.href = `produto.html#${p.id}`
                a.href = `produto.html#${p.id}`
                imagemProduto.src = p.imagem;
                tdNomeProduto.classList.add("mdl-data-table__cell--non-numeric");
                tdDescricaoProduto.classList.add("mdl-data-table__cell--non-numeric");
                tdImagemProduto.classList.add("mdl-data-table__cell--non-numeric");


                aImg.appendChild(imagemProduto)
                tdImagemProduto.appendChild(aImg);
                tdNomeProduto.textContent = p.nome;
                a.textContent = p.descricao;
                tdQuantidadeProduto.textContent = p.quantidade;
                tdValorTotalProduto.textContent = (p.quantidade * p.valor).toFixed(2);
                tr.id = p.id;
                valorTotal += Number(tdValorTotalProduto.textContent);
                tdDescricaoProduto.appendChild(a);
                tr.append(tdImagemProduto,tdNomeProduto,tdDescricaoProduto,tdQuantidadeProduto,tdValorTotalProduto);
                tbody.appendChild(tr);
            }

            this.desenharTotalizacao(valorTotal);
          }

          public exibirBotaoCompra(carrinho: Carrinho): void{
            if(carrinho.obterCarrinho().length < 1){
                document.getElementById('compra')!.style.display = 'none';
                alert('Seu carrinho de compras está vazio');
            }else{
                document.getElementById('compra')!.style.display = '';
            }
          }

          public removerProdutos(carrinho: Carrinho): void{
            document.getElementById('excluir')!.addEventListener('click', () => {
              const selectedItems: NodeListOf <HTMLElement> = document.querySelectorAll('tbody .is-selected');
              selectedItems.forEach((selected: HTMLElement) => {
                selected.remove();
                carrinho.removerProduto(Number(selected.id));
                this.valorotal();
              });
              this.exibirBotaoCompra(carrinho);
            });
          }

          public removerProdutoPorID(carrinho: Carrinho, id: number): void{
            const tr: HTMLTableCellElement = document.getElementById(String(id))! as HTMLTableCellElement;
            tr.remove();
            this.valorotal();
          }

          public valorotal(): void{
            const total: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('tfoot td') as NodeListOf<HTMLTableCellElement>;
            const trs: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tbody tr') as NodeListOf<HTMLTableRowElement>;

            if (trs.length === 0) {
              total[2].textContent = "0.00";
            } else {
              let sum = 0;

              for (const tr of trs) {
                sum += Number(tr.lastChild!.textContent);
              }

              total[2].textContent = sum.toFixed(2);
            }
          }

          public exibirQuantidadeProdutos(carrinho: Carrinho){
            const badge: HTMLSpanElement = document.querySelector('.badge')! as HTMLSpanElement
            if(carrinho.obterTotalItens()){
              badge.style.display = '';
              badge.textContent = String(carrinho.obterTotalItens());
            }else{
              badge.style.display = 'none';
            }
          }

          public realizarCompra(carrinho: Carrinho): void{
            document.getElementById('compra')!.addEventListener('click', () => {
              const pedidoController = new PedidoController();
              const produtos = carrinho.obterCarrinho();
              if (this.redirecionarSeNaoLogado()) {
                pedidoController.realizarCompra(JSON.stringify(produtos));
              }
            });
          }

          public limparCarrinho(): void{
            const itens: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('tbody tr')! as NodeListOf<HTMLTableCellElement>;
            for(const tr of itens){
              tr.remove();
            }

            const total: HTMLElement = document.querySelectorAll('tr td')[2]! as HTMLElement;
            total.textContent = '0.00';
          }

          public redirecionarSeNaoLogado () {
            if(!Aluno.validarCookie() && !Aluno.validarNome()){
              window.location.href = 'login.html';
            }else{
              return true;
            }
          }
}
