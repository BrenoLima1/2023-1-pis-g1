<?php
require_once(__DIR__.'/../Generic/GenericView.php');

class AlunoView extends GenericView{

    public function __construct() {

    }

    public function exibirMensagemLogout()
    {
        http_response_code(200);
        die(json_encode('Sessão finalizada com sucesso!'));
    }

    public function exibirMensagemCompra()
    {
        http_response_code(200);
        die(json_encode('Compra finalizada com sucesso!'));
    }

}

?>
