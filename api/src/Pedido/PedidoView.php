<?php
require_once(__DIR__.'/../Generic/GenericView.php');

class PedidoView extends GenericView{

    public function exibirErroCompra($mensagem)
    {
        http_response_code(400);
        echo json_encode($mensagem);
    }

    // public function exibirErroQuantidade($mensagem)
    // {
    //     http_response_code(422);
    //     echo json_encode($mensagem);
    // }

    public function exibirErroSaldo($mensagem)
    {
        http_response_code(402);
        echo json_encode($mensagem);
    }

    public function exibirErroPreco($mensagem)
    {
        http_response_code(409);
        echo json_encode($mensagem);
    }
}

?>
