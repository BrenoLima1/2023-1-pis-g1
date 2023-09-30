<?php
require_once('src/Produto/ProdutoController.php');
require_once('src/Aluno/AlunoController.php');
require_once('src/Pedido/PedidoController.php');

$caminho = $_SERVER['REQUEST_URI'];
$rota = basename($caminho);
$metodo = $_SERVER['REQUEST_METHOD'];

$produtoController = new ProdutoController();
$alunoController = new AlunoController();
$pedidoController = new PedidoController();

if($metodo === 'GET' && $rota === 'mais_vendidos'){
   $produtoController->listarProdutosMaisVendidos();
}
elseif ($metodo === 'GET' && (parse_url($rota, PHP_URL_PATH)) === 'produtos') {
    $pagina = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
    $produtoController->listarProdutosPaginados($pagina);
}
elseif ($metodo === 'GET' && basename(dirname($caminho)) === 'produto' && is_numeric($rota)) {
        $produtoController->obterProdutoPeloId($rota);
}
elseif($metodo === 'POST' && $rota === 'login'){
    $alunoController->login();
}
elseif($metodo === 'GET' && $rota === 'aluno'){
    $alunoController->obterDados();
}
elseif($metodo === 'GET' && $rota === 'pedido'){
    $pedidoController->obterDados();
}
elseif($metodo === 'GET' && $rota === 'sessao'){
    $alunoController->verificarSessao();
}
elseif($metodo === 'POST' && $rota === 'logout'){
    $alunoController->logout();
}
elseif($metodo === 'POST' && $rota === 'comprar'){
    $pedidoController->realizarCompra();
}

?>
