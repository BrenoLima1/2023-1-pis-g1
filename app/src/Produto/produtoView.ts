import { GenericView } from "../Generic/generic-view.js";
import { ProdutosPaginados } from "../Services/ProdutosService";
import { Produto } from "./produto.js";
export class ProdutoView extends GenericView{

    public exibirProdutos(produtos: Produto[]): void{
        const fragmento: DocumentFragment = document.createDocumentFragment() as DocumentFragment;
        const divProdutos: HTMLDivElement = document.getElementById('produtos')! as HTMLDivElement;

        for (const p of produtos) {
            const div: HTMLDivElement = document.createElement('div');
            const divchild: HTMLDivElement = document.createElement('div');
            const imagem: HTMLImageElement = document.createElement('img');
            const precoOriginal: HTMLHeadingElement = document.createElement('h2');
            const precoComDesconto: HTMLHeadingElement = document.createElement('h3');
            const desconto: HTMLHeadingElement = document.createElement('h1');
            const descricao: HTMLParagraphElement = document.createElement('p');
            const botaoDetalhes: HTMLButtonElement = document.createElement('button');
            const a: HTMLAnchorElement = document.createElement('a')as HTMLAnchorElement;
            const inputID: HTMLInputElement = document.createElement('input') as HTMLInputElement;

            inputID.type = 'hidden';

            imagem.src = `data:image/jpeg;base64,${p.imagem}`;

            a.textContent = 'Ir para o Carrinho';

            imagem.setAttribute('redirect', p.id.toString());
            descricao.setAttribute('redirect', p.id.toString());
            a.href = 'carrinho.html';

            descricao.textContent = String (p.descricao);
            precoOriginal.textContent = '$C ' + this.descontoEmCefetin(p);
            precoComDesconto.textContent = String (p.preco);
            desconto.textContent = String (p.desconto_percentual) + '% de desconto!';
            botaoDetalhes.textContent = 'Detalhes';
            botaoDetalhes.setAttribute('redirect', p.id.toString());

            inputID.value = String(p.id);

            divchild.append(imagem,descricao,precoComDesconto,precoOriginal,desconto,botaoDetalhes,a, inputID);
            div.appendChild(divchild);

            div.classList.add('pai');

            fragmento.append(div);

            precoComDesconto.style.color = 'blue';

            if(p.desconto_percentual){
                precoComDesconto.style.textDecoration = 'line-through dashed';
            }else{
                desconto.style.display = 'none';
                precoComDesconto.style.display = 'none';
            }
        }

        divProdutos.appendChild(fragmento);
    }

    public exibirProdutoComID(produto: Produto[]): void{
        const fragmento: DocumentFragment = document.createDocumentFragment() as DocumentFragment;
        const divProdutos: HTMLDivElement = document.getElementById('produto')! as HTMLDivElement;

        for (const p of produto) {
            const div: HTMLDivElement = document.createElement('div');
            const divchild: HTMLDivElement = document.createElement('div');
            const imagem: HTMLImageElement = document.createElement('img');
            const nome: HTMLHeadingElement = document.createElement('h1');
            const precoOriginal: HTMLHeadingElement = document.createElement('h3');
            const precoComDesconto: HTMLHeadingElement = document.createElement('h2');
            const desconto: HTMLHeadingElement = document.createElement('h1');
            const descricao: HTMLParagraphElement = document.createElement('p');
            const quantidade: HTMLSelectElement = document.createElement('select');
            // const vendas: HTMLHeadingElement = document.createElement('h2');
            const periodoLancamento: HTMLParagraphElement = document.createElement('p');
            const inputID: HTMLInputElement = document.createElement('input') as HTMLInputElement;
            const a: HTMLAnchorElement = document.createElement('a')as HTMLAnchorElement;
            const botaoAdicionarAoCarrionho: HTMLButtonElement = document.createElement('button');

            inputID.type = 'hidden';
            imagem.src = `data:image/jpeg;base64,${p.imagem}`;

            a.href = 'carrinho.html';
            a.textContent = 'Ir para o Carrinho';

            descricao.textContent = String (p.descricao);
            // vendas.textContent = String (p.vendas) + ' vendidos';
            nome.textContent = p.nome;
            precoComDesconto.textContent = '$C ' + this.descontoEmCefetin(p);
            precoOriginal.textContent = String (p.preco);
            desconto.id = 'id-desconto';
            desconto.textContent = String (p.desconto_percentual) + '% de desconto!';
            this.preencherSelect(p,quantidade);
            periodoLancamento.textContent = 'Período de lançamento: ' + this.periodoLancamento(p);
            inputID.value = String(p.id);

            botaoAdicionarAoCarrionho.textContent = 'Adicionar ao carrinho';
            botaoAdicionarAoCarrionho.id = 'adicionar';

            divchild.append(imagem,nome,descricao,precoOriginal,precoComDesconto,desconto,quantidade,periodoLancamento,inputID, botaoAdicionarAoCarrionho,a);
            div.appendChild(divchild);

            div.classList.add('pai');

            fragmento.append(div);

            precoOriginal.style.color = 'blue';

            if(p.desconto_percentual){
                precoOriginal.style.textDecoration = 'line-through dashed';
            }else{
                desconto.style.display = 'none';
                precoOriginal.style.display = 'none';
            }
        }

        divProdutos.appendChild(fragmento);
    }

    public descontoEmCefetin(produto: Produto): string {
        return (parseFloat((produto.preco - ((produto.desconto_percentual * produto.preco)/100)).toString()).toFixed(2));
    }

    public periodoLancamento(produto: Produto): string{
        return produto.data_lancamento.split('-').reverse().join('/').slice(3);
    }

    public preencherSelect(produto: Produto, quantidade: HTMLSelectElement) {
        if (produto.quantidade >= 10) {
            for (let i = 1; i <= 10; i++) {
                const option = document.createElement('option') as HTMLOptionElement;
                option.value = i.toString();
                option.textContent = i.toString();
                quantidade.appendChild(option);
            }
        }else if(produto.quantidade < 1){
            const option = document.createElement('option') as HTMLOptionElement;
            option.value = 'Esgotado';
            option.textContent = 'Esgotado';
            quantidade.appendChild(option);
            quantidade.disabled = true;
            quantidade.style.backgroundColor = 'aqua';
            quantidade.style.color = 'black';
            this.desabilitarBotao();
        }else if(produto.quantidade < 10){
            for (let i = 1; i <= produto.quantidade; i++) {
                const option = document.createElement('option') as HTMLOptionElement;
                option.value = i.toString();
                option.textContent = i.toString();
                quantidade.appendChild(option);
            }
        }
    }

    public obterIDProduto(): string{
        return window.location.hash.substring(1);
    }

    public obterNumeroPagina(): number{
        let numeroPagina: number = Number(window.location.hash.substring(1));
        return (numeroPagina < 1 || isNaN(numeroPagina)) ? 1 : numeroPagina;
    }

    public redirecionarParaProdutoComID(): void{
        const listaProdutos = document.getElementById('produtos')!;

        listaProdutos.addEventListener('click', (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (target!.hasAttribute('redirect')) {
            window.location.href = `produto.html#${target.getAttribute('redirect')}`;
          }
        });
    }

    public redirecionarParaTodosProdutos(): void{
        document.getElementById('mais')?.addEventListener('click', ()=>{
            window.location.href = 'produtos.html';
        })
    }

    public colorirBotao(): void {
        const botoes: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#paginacao button')! as NodeListOf<HTMLButtonElement>;

        botoes.forEach((botao) => {
        if (botao.textContent == String(this.obterNumeroPagina())) {
            botao.style.color = 'red';
        }
        });
    }

    public exibirProdutosPaginados(produtos: ProdutosPaginados): void {
        const totalPaginas: number = produtos.totalPaginas;
        const produto =  produtos.produtos;
        this.criarBotoesPaginacao(totalPaginas);
        this.AdicionarValorDaPaginaNaUrl();
        this.exibirProdutos(produto);
        this.colorirBotao();
      }

    public criarBotoesPaginacao(totalPaginas: number): void{
        const botoes = document.getElementById('paginacao')! as HTMLDivElement;
        for (let i = 1; i <= totalPaginas; i++) {
            const botao = document.createElement('button') as HTMLButtonElement;
            botao.textContent = String (i);
            botoes.appendChild(botao);
        }
    }

    public AdicionarValorDaPaginaNaUrl(): void{
        const botoes: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#paginacao button')! as NodeListOf<HTMLButtonElement>;
        for (const botao of botoes) {
            botao.addEventListener('click', ()=>{
                window.location.href = '#' + String (botao.textContent);
            })
        }
    }

    public buscarProdutosPaginados(produto: ProdutosPaginados): void{
        let paginaAtual: number = Number(this.obterNumeroPagina());
        if (paginaAtual <= produto.totalPaginas) {
            window.addEventListener('hashchange',()=>{
                window.location.reload();
            });
        }else{
            window.location.href = '#' + produto.totalPaginas;
            window.location.reload();
        }
    }

    public desabilitarBotao(): void{
        const observarBotao = () => {
          const botaoAdicionar: HTMLButtonElement = document.getElementById('adicionar') as HTMLButtonElement;
          if (botaoAdicionar) {
            botaoAdicionar.disabled = true;
          } else {
            setTimeout(observarBotao, 50);
          }
        };
        observarBotao();
    }

}
