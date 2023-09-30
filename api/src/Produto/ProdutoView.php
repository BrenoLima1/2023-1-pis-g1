<?php
require_once('Produto.php');
require_once(__DIR__.'/../Generic/GenericView.php');

class ProdutoView extends GenericView{

    public function __construct() {
    }

    public function exibirProdutosPaginados($produtos, $totalPaginas)
    {
        http_response_code(200);
        echo json_encode([
            'produtos' => $produtos,
            'totalPaginas' => $totalPaginas
        ]);
    }

}

?>
