<?php


interface RepositorioProduto{
    public function obterProdutosMaisVendidos();

    public function obterTotalDePaginas();

    public function obterProdutosPaginados(int $pagina);

    public function obterProdutoPeloID(int $id);
}


?>
