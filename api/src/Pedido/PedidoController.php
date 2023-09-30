<?php
require_once('RepositorioPedidoEmPDO.php');
require_once('PedidoView.php');
require_once('Pedido.php');
require_once('ItensPedidoDTO.php');
require_once(__DIR__.'/../util/sessao.php');
require_once(__DIR__.'/../Connection/config.php');
require_once(__DIR__.'/../Exception/PedidoException.php');

class PedidoController{
    private $pedidoEmPDO;
    private $pedidoView;
    public function __construct() {
        $this->pedidoEmPDO = new PedidoEmPDO(conexaoPDO());
        $this->pedidoView = new PedidoView();
    }

    public function obterDados()
    {
        try {
            iniciarSessao();
            $data = $this->pedidoEmPDO->obterDados(obterIDUsuario());
            $pedidos = $this->converterParaArrayDePedidos($data);
            foreach($pedidos as $p){
                $itens = $this->pedidoEmPDO->obterItensPorPedidoId($p->getId());
                $p->setItens($this->converterParaArrayDeItens($itens));
            }
            $this->pedidoView->exibirDados($pedidos);
        } catch (\PedidoException $e) {
            $this->pedidoView->exibirErroServidor('Erro ao obter dados. ' . $e->getMessage());
        }
    }

    public function realizarCompra() {
        iniciarSessao();
        $produtos = json_decode($_POST['produtosJson']);
        $idAluno = obterIDUsuario();

        try {
            $this->validarQuantidadeProduto($produtos);
            $this->validarPrecoProduto($produtos);
            $saldoAluno = $this->pedidoEmPDO->obterSaldoAluno($idAluno);
            $valores = array_column($produtos, 'total');
            $total = array_sum($valores);
            if($saldoAluno - $total >= 0){
                $this->pedidoEmPDO->inserirPedidoComItens($idAluno, $produtos, $saldoAluno);
                $this->pedidoView->exibirDados('');
            }else{
                $this->pedidoView->exibirErroSaldo('');
            }

        } catch (\PedidoException $e) {
            $this->pedidoView->exibirErroServidor('Erro ao realizar compra. ' . $e->getMessage());
        }
    }

    public function validarPrecoProduto($produtos)
    {
        try {
            $id = $this->pedidoEmPDO->verificarValorProduto($produtos);
            if($id>0){
                $this->pedidoView->exibirErroPreco($id);

            }
        } catch (\PedidoException $e) {
            $this->pedidoView->exibirErroProcessamento($e->getMessage());
        }
    }

    public function validarQuantidadeProduto($produtos)
    {
        $qtdproduto = 0;
        try {
            $qtdproduto = $this->pedidoEmPDO->verificarQuantidadeProduto($produtos);
            if($qtdproduto > 0){
                $this->pedidoView->exibirErroProcessamento($qtdproduto);
            }
        } catch (\PedidoException $e) {
            $this->pedidoView->exibirErroServidor($e->getMessage());
        }
    }


    public function converterParaArrayDeItensPedido($data)
    {
        foreach($data as $pd){
            $itensPedido[] = [
                'idProduto' => $pd->id,
                'quantidade' => $pd->quantidade,
                'preco' => $pd->valor,
                'desconto' => $pd->desconto
            ];
        }

        return $itensPedido;
    }


    public function converterParaArrayDePedidos($data)
    {
        $pedidos = [];

        foreach ($data as $d) {
            $pedido = new Pedido(
                $d['id'],
                $d['id_aluno'],
                $d['data_hora'],
                $d['total']
            );

            $pedidos[] = $pedido;
        }

        return $pedidos;
    }

    public function converterParaArrayDeItens($data)
    {
        $itens = [];

        foreach ($data as $d) {
            $item = new ItensPedidoDTO(
                $d['imagem'],
                $d['descricao'],
                $d['desconto_original'],
                $d['preco_original'],
                $d['quantidade_comprada']
            );

            $itens[] = $item;
        }

        return $itens;
    }


}
?>
