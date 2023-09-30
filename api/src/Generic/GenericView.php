<?php
class GenericView{

    public function exibirDados($dados)
    {
        http_response_code(200);
        echo json_encode($dados);
    }

    public function exibirErroServidor($message)
    {
        http_response_code(500);
        die(json_encode([
                    'message' => 'Erro interno do servidor: ' . $message,
                ]));
    }

    public function exibirErroProcessamento($message)
    {
        http_response_code(422);
        die(json_encode([
                    'message' => '' . $message,
                ]));
    }

    public function exibirErroPagina()
    {
        http_response_code(400);
        die(json_encode([
                    'message' => 'Página inexistente.'
                ]));
    }

    public function exibirErroSessao($message)
    {
        http_response_code(401);
        die(json_encode($message));
    }
}
?>
