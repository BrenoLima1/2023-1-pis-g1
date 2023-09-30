<?php

interface RepositorioPedido{
    public function obterDados(int $id);

    public function  obterItensPorPedidoId(int $pedidoId);

    public function inserirPedidoComItens(int $idAluno, $produtosDecoded, $saldoAluno);
}

?>
