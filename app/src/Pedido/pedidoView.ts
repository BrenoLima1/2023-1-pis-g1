import { Pedido } from "../Pedido/pedido.js";
import { ItensPedido } from "./itens-pedido.js";
import { GenericView } from "../Generic/generic-view.js";

declare const google: any;

export class PedidoView extends GenericView{

  public exibirPedido(pedidos: Pedido[]) {
    const divPedido = document.getElementById('tabela-pedidos');
    for (const p of pedidos) {
      const tablePedido = document.createElement('table');
      tablePedido.classList.add("mdl-data-table");
      tablePedido.classList.add("mdl-js-data-table");
      tablePedido.classList.add("mdl-shadow--2dp");
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      const thPedido = document.createElement('th');
      thPedido.classList.add("mdl-data-table__cell--non-numeric");
      thPedido.textContent = "Pedido Id";
      const thData = document.createElement('th');
      thData.classList.add("mdl-data-table__cell--non-numeric");
      thData.textContent = "Data";
      const thHora = document.createElement('th');
      thHora.classList.add("mdl-data-table__cell--non-numeric");
      thHora.textContent = "Hora";
      const thTotal = document.createElement('th');
      thTotal.classList.add("mdl-data-table__cell--non-numeric");
      thTotal.textContent = "Total";
      tr.append(thPedido, thData, thHora, thTotal);

      const trValoresPedido = document.createElement('tr');
      const tdPedido = document.createElement('td');
      const tdData = document.createElement('td');
      const tdHora = document.createElement('td');
      const tdTotal = document.createElement('td');

      tdPedido.classList.add("mdl-data-table__cell--non-numeric");
      tdData.classList.add("mdl-data-table__cell--non-numeric");
      tdHora.classList.add("mdl-data-table__cell--non-numeric");
      tdTotal.classList.add("mdl-data-table__cell--non-numeric");

      tdPedido.textContent = String(p.id);
      tdData.textContent = (p.data_hora.split(' ')[0]).split('-').reverse().join('/');
      tdHora.textContent = p.data_hora.split(' ')[1];

      let totalPedido = 0;
      for (const item of p.itens_pedido) {
        totalPedido += item.preco_original * item.quantidade_comprada;
      }
      tdTotal.textContent = totalPedido.toFixed(2);

      trValoresPedido.append(tdPedido, tdData, tdHora, tdTotal);
      thead.append(tr, trValoresPedido);

      const tbody = document.createElement('tbody');
      const trItens = document.createElement('tr');
      const tdItens = document.createElement('td');
      tdItens.colSpan = 6;
      const tableItens = document.createElement('table');
      tableItens.classList.add("mdl-data-table");
      tableItens.classList.add("mdl-js-data-table");
      tableItens.classList.add("mdl-shadow--2dp");
      const theadItens = document.createElement('thead');
      const trItensTitulo = document.createElement('tr');

      const thImagem = document.createElement('th');
      thImagem.classList.add("mdl-data-table__cell--non-numeric");
      thImagem.textContent = "Imagem";

      const thDescricao = document.createElement('th');
      thDescricao.classList.add("mdl-data-table__cell--non-numeric");
      thDescricao.textContent = "Descrição";

      const thPrecoOriginal = document.createElement('th');
      thPrecoOriginal.textContent = "Preço Original";

      const thQuantidadeComprada = document.createElement('th');
      thQuantidadeComprada.textContent = "Quantidade Comprada";

      const thSubTotal = document.createElement('th');
      thSubTotal.textContent = "Sub Total";

      trItensTitulo.append(thImagem, thDescricao, thPrecoOriginal, thQuantidadeComprada, thSubTotal);
      theadItens.append(trItensTitulo);
      for (const item of p.itens_pedido) {
        const trItensValor = this.montarTabelaItensPedido(item);
        theadItens.append(trItensValor);
      }
      tableItens.append(theadItens);
      tdItens.append(tableItens);
      trItens.append(tdItens);
      tbody.append(trItens);
      tablePedido.append(thead);
      tablePedido.append(tbody);
      divPedido?.append(tablePedido);
    }

    this.obterAnosEValorTotalComprado(pedidos);
  }


    private montarTabelaItensPedido(item :ItensPedido){
        const trItensValor = document.createElement('tr');
        const tdImagem = document.createElement('td');
        const imagemProduto = document.createElement('img');
        const tdDescricao = document.createElement('td');
        const tdPrecoOriginal = document.createElement('td');
        const tdQtdComprada = document.createElement('td');
        const tdSubTotal = document.createElement('td');

        tdImagem.classList.add("mdl-data-table__cell--non-numeric");
        tdDescricao.classList.add("mdl-data-table__cell--non-numeric");

        imagemProduto.src = `data:image/jpeg;base64,${item.imagem}`;
        tdImagem.appendChild(imagemProduto);
        tdDescricao.textContent = item.descricao;
        tdPrecoOriginal.textContent = String(item.preco_original);
        tdQtdComprada.textContent = String(item.quantidade_comprada);
        tdSubTotal.textContent = String(item.preco_original * item.quantidade_comprada);
        trItensValor.append(tdImagem,tdDescricao, tdPrecoOriginal, tdQtdComprada, tdSubTotal);
        return trItensValor;
    }


    public obterAnosEValorTotalComprado(pedidos: Pedido[]) {
      const anosCompras: { [ano: number]: number } = {};
      for (const pedido of pedidos) {
        const ano = new Date(pedido.data_hora).getFullYear();
        if (!anosCompras[ano]) {
          anosCompras[ano] = 0;
        }
        anosCompras[ano] += Number(pedido.total);
      }

      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        this.desenharGrafico(anosCompras);
      });
    }

    private desenharGrafico(anosCompras: { [ano: number]: number }) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Ano');
      data.addColumn('number', 'Valor total comprado ($C)');
      for (const ano in anosCompras) {
        data.addRow([ano, anosCompras[ano]]);
      }

      const options = {
        title: 'Valor total comprado por ano ($C)',
        hAxis: { title: 'Ano' },
        vAxis: { minValue: 0 }
      };

      const chart = new google.visualization.ColumnChart(document.getElementById('grafico'));
      chart.draw(data, options);
    }


    }
