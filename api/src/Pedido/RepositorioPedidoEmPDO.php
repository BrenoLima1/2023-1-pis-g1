<?php
require_once(__DIR__.'/../Abstracts/BasePDO.php');
require_once('RepositorioPedido.php');
class PedidoEmPDO extends BasePDO implements RepositorioPedido{

    private $pdo;
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function obterDados(int $id){
        try {
            $sql = 'SELECT * FROM pedidos
                    WHERE id_aluno = :id';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':id', $id, PDO::PARAM_INT);
            $ps->execute();
            return $ps->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new AlunoException($e->getMessage());
        }
    }

    public function obterItensPorPedidoId(int $pedidoId){
        try {
            $sql = 'SELECT produtos.imagem, produtos.descricao,
                    itens_pedido.desconto_percentual AS desconto_original,
                    itens_pedido.preco AS preco_original,
                    itens_pedido.quantidade AS quantidade_comprada
                    FROM itens_pedido
                    INNER JOIN produtos ON produtos.id = itens_pedido.id_produto
                    WHERE id_pedido = :id';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':id', $pedidoId, PDO::PARAM_INT);
            $ps->execute();
            $itens =  $ps->fetchAll(PDO::FETCH_ASSOC);
            return $this->codificarImagensEmBase64($itens);
        } catch (\PDOException $e) {
            throw new PedidoException($e->getMessage());
        }
    }

    public function obterSaldoAluno($idAluno) {
        try {
            $sql = 'SELECT saldo FROM alunos WHERE id = :idAluno';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':idAluno', $idAluno, PDO::PARAM_INT);
            $ps->execute();
            $resultado = $ps->fetch(PDO::FETCH_ASSOC);

            if ($resultado === false) {
                throw new PedidoException('Aluno não encontrado.');
            }

            return $resultado['saldo'];
        } catch (\PDOException $e) {
            throw new PedidoException($e->getMessage());
        }
    }


    public function inserirPedidoComItens($idAluno, $produtosDecoded, $saldoAluno) {
        $valores = array_column($produtosDecoded, 'total');
        $total = array_sum($valores);

        $novoSaldo = $saldoAluno - $total;

        try {

            $this->pdo->beginTransaction();

            $sql = 'INSERT INTO pedidos (id_aluno, total) VALUES (:id, :total)';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':id', $idAluno, PDO::PARAM_INT);
            $ps->bindValue(':total', $total, PDO::PARAM_STR);
            $ps->execute();
            $idPedido = $this->pdo->lastInsertId();

            $this->inserirItensDoPedido($idPedido, $produtosDecoded);

            // Atualizar o saldo do aluno no banco de dados
            $sql = 'UPDATE alunos SET saldo = :novoSaldo WHERE id = :idAluno';
            $ps = $this->pdo->prepare($sql);

            if(is_numeric($novoSaldo)){
                $ps->bindValue(':novoSaldo', $novoSaldo, PDO::PARAM_STR);
                $ps->bindValue(':idAluno', $idAluno, PDO::PARAM_INT);
                $ps->execute();
            }

            $this->atualizarQuantidadeProduto($produtosDecoded);

            $this->pdo->commit();
            return $idPedido;
        } catch (\PDOException $e) {
            $this->pdo->rollBack();
            throw new PedidoException($e->getMessage());
        }
    }



    public function inserirItensDoPedido($idPedido, $produtosDecoded) {
        try {
            $sql = 'INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco, desconto_percentual)
                                               VALUES (:id, :idproduto, :qtd, :preco, :desconto)';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':id', $idPedido, PDO::PARAM_INT);

            foreach ($produtosDecoded as $produto) {
                if(is_numeric($produto->id) && is_numeric($produto->quantidade) && is_numeric($produto->valor) && is_numeric($produto->desconto)){
                    $ps->bindValue(':idproduto', $produto->id, PDO::PARAM_INT);
                    $ps->bindValue(':qtd', $produto->quantidade, PDO::PARAM_INT);
                    $ps->bindValue(':preco', $produto->valor, PDO::PARAM_STR);
                    $ps->bindValue(':desconto', $produto->desconto, PDO::PARAM_STR);

                    $ps->execute();
                }
            }
        } catch (\PDOException $e) {
            throw new PedidoException($e->getMessage());
        }
    }


    public function verificarValorProduto($produtosDecoded) {
        try {
            $sql = 'SELECT id, preco, desconto_percentual FROM produtos WHERE id = :id';
            $ps = $this->pdo->prepare($sql);

            foreach ($produtosDecoded as $produto) {
                $ps->bindValue(':id', $produto->id, PDO::PARAM_INT);
                $ps->execute();
                $resultado = $ps->fetch(PDO::FETCH_ASSOC);
                if ($resultado === false) {
                    throw new PedidoException('Produto não encontrado.');
                }
                $resultadoBdComDesconto = ($resultado['preco'] * $produto->quantidade) - ((($resultado['preco'] * $produto->quantidade) * $resultado['desconto_percentual']) / 100);

                if (round($resultadoBdComDesconto, 2) != round($produto->valor, 2)) {
                    // throw new PedidoException('O valor do produto fornecido não corresponde ao valor cadastrado no banco de dados.');
                    return $resultado['id'];
                }
            }

            return 0;

        } catch (\PDOException $e) {
            throw new PedidoException($e->getMessage());
        }
    }


    public function verificarQuantidadeProduto($produtosDecoded) {
        try {
            $sql = 'SELECT id,quantidade FROM produtos WHERE id = :id';
            $ps = $this->pdo->prepare($sql);
            // $resultado = 0;

            foreach ($produtosDecoded as $produto) {
                $ps->bindValue(':id', $produto->id, PDO::PARAM_INT);
                $ps->execute();
                $resultado = $ps->fetch(PDO::FETCH_ASSOC);

                if ($produto->quantidade > 0 && ($produto->quantidade > $resultado['quantidade'])) {
                    return $produto->id;
                }
            }

            return 0;

        } catch (\PDOException $e) {
            throw new PedidoException($e->getMessage());
        }
    }

    public function atualizarQuantidadeProduto($produtosDecoded) {
        try {
            $sql = 'UPDATE produtos SET quantidade = quantidade - :qtd WHERE id = :id';
            $ps = $this->pdo->prepare($sql);

            foreach ($produtosDecoded as $produto) {
            $ps->bindValue(':qtd', $produto->quantidade, PDO::PARAM_INT);
            $ps->bindValue(':id', $produto->id, PDO::PARAM_INT);
            $ps->execute();
        }

        } catch (\PDOException $e) {
        throw new PedidoException($e->getMessage());
        }
       }







}

?>
