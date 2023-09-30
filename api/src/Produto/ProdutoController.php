<?php
require_once('RepositorioProdutoEmPDO.php');
require_once('ProdutoView.php');
require_once(__DIR__.'/../Connection/config.php');
require_once(__DIR__.'/../Exception/ProdutoException.php');

class ProdutoController {
    private $produtoEmPDO;
    private $produtoView;

    public function __construct() {
        $this->produtoEmPDO = new ProdutoEmPDO(conexaoPDO());
        $this->produtoView = new ProdutoView();
    }

    public function listarProdutosMaisVendidos() {
        try {
            $produtosData = $this->produtoEmPDO->obterProdutosMaisVendidos();
            $this->produtoView->exibirDados($this->arrayDeProdutos($produtosData));
        } catch (\ProdutoException $e) {
            $this->produtoView->exibirErroServidor($e->getMessage());
        }
    }

    public function obterProdutoPeloId(int $id)
    {
        try {
                $produtoData = $this->produtoEmPDO->obterProdutoPeloID($id);
                $produto = $this->arrayDeProdutos($produtoData);
                $this->produtoView->exibirDados($produto);
        } catch (\ProdutoException $e) {
            $this->produtoView->exibirErroServidor($e->getMessage());
        }
    }

    public function listarProdutosPaginados($pagina) {
        try {
                $produtosData = $this->produtoEmPDO->obterProdutosPaginados($pagina);
                $produtos = $this->arrayDeProdutos($produtosData);
                $totalPaginas = $this->obterTotalDePaginas();
                $this->produtoView->exibirProdutosPaginados($produtos, $totalPaginas);
        } catch (\ProdutoException $e) {
            $this->produtoView->exibirErroServidor($e->getMessage());
        }
    }

    public function obterTotalDePaginas()
    {
        try {
            return $this->produtoEmPDO->obterTotalDePaginas();
        } catch (\PaginacaoException $e) {
            $this->produtoView->exibirErroServidor($e->getMessage());
        }
    }

    public function arrayDeProdutos ($produtosData)
    {
        $produtos = [];

        foreach ($produtosData as $produtoData) {
            $produto = new Produto(
                $produtoData['id'],
                $produtoData['nome'],
                $produtoData['descricao'],
                $produtoData['preco'],
                $produtoData['desconto_percentual'],
                $produtoData['imagem'],
                $produtoData['quantidade'],
                $produtoData['data_lancamento'],
                $produtoData['vendas']
            );

            $produtos[] = $produto;
        }

        return $produtos;
    }

}


?>
