<?php
require_once('vendor/autoload.php');
require_once('src/Produto/RepositorioProdutoEmPDO.php');
require_once('src/Connection/config.php');


describe('ProdutoEmPDO', function () {
    $this->pdo = conexaoPDO();
    $this->produtoEmPDO = new ProdutoEmPDO($this->pdo);

    describe('obterTotalDePaginas', function () {
        it('deve retornar o total de páginas', function() {
            $totalRegistros = 20;
            $totalPaginasEsperadas = 2;

            $totalPaginasRecebidas = $this->produtoEmPDO->obterTotalDePaginas();

            expect($totalPaginasRecebidas)->toBe($totalPaginasEsperadas);
        });
        });

    describe('obter total de páginas', function () {
        $this->pdo = conexaoPDO();
        $this->produtoEmPDO = new ProdutoEmPDO($this->pdo);

        it('deve retornar o produto pelo id', function() {
            $nomeProduto = 'Jaqueta Atlética CEFET';

            $produtoComID = $this->produtoEmPDO->obterProdutoPeloID(1);

            expect($produtoComID[0]['nome'])->toBe('Jaqueta Atlética CEFET');
        });
        });

    describe('obter produtos mais vendidos', function () {
        $this->pdo = conexaoPDO();
        $this->produtoEmPDO = new ProdutoEmPDO($this->pdo);

        it('deve retornar o produto pelo id', function() {
            $nomeProduto1 = 'Jaqueta Atlética CEFET';
            $nomeProduto2 = 'Camisa Alcateia';
            $nomeProduto3 = 'Jaleco CEFET';
            $nomeProduto4 = 'Pulseira CEFET';
            $nomeProduto5 = 'Boné azul lobo';
            $nomeProduto6 = 'Bandeira Lobo Alcateia';

            $produtoMaisVendidos = $this->produtoEmPDO->obterProdutosMaisVendidos();

            expect($produtoMaisVendidos[0]['nome'])->toBe('Bandeira Lobo Alcateia');
            expect($produtoMaisVendidos[1]['nome'])->toBe('Pulseira CEFET');
            expect($produtoMaisVendidos[2]['nome'])->toBe('Boné azul lobo');
            expect($produtoMaisVendidos[3]['nome'])->toBe('Camisa Alcateia');
            expect($produtoMaisVendidos[4]['nome'])->toBe('Jaqueta Atlética CEFET');
            expect($produtoMaisVendidos[5]['nome'])->toBe('Jaleco CEFET');
            expect($produtoMaisVendidos)->toHaveLength(6);
        });
        });


    });
