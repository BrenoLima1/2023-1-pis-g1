<?php
require_once('RepositorioProduto.php');
require_once(__DIR__.'/../Abstracts/BasePDO.php');

class ProdutoEmPDO extends BasePDO implements RepositorioProduto{
    private $pdo;
    private $itensPaginaInicial = 6;
    private $itensPorPagina = 10;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function obterProdutosMaisVendidos()
    {
        try {
            $sql = 'SELECT * FROM produtos ORDER BY vendas DESC LIMIT :itensPaginaInicial';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':itensPaginaInicial', $this->itensPaginaInicial, PDO::PARAM_INT);
            $ps->execute();
            $produtos = $ps->fetchAll(PDO::FETCH_ASSOC);

            return $this->codificarImagensEmBase64($produtos);
        } catch (\PDOException $e) {
            throw new ProdutoException($e->getMessage());
        }
    }

    public function obterTotalDePaginas() {
        try {
            $sql = 'SELECT COUNT(*) FROM produtos';
            $ps = $this->pdo->prepare($sql);
            $ps->execute();
            $result = $ps->fetchColumn();
            $total = ceil($result / $this->itensPorPagina);

            return intval($total);
        } catch (\PDOException $e) {
            throw new PaginacaoException($e->getMessage());
        }
    }

    public function obterProdutosPaginados($pagina) {
        try {
            $offset = ($pagina - 1) * $this->itensPorPagina;
            $sql = "SELECT * FROM produtos ORDER BY id DESC LIMIT :itensPorPagina OFFSET :offset";
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':itensPorPagina', $this->itensPorPagina, PDO::PARAM_INT);
            $ps->bindValue(':offset', $offset, PDO::PARAM_INT);
            $ps->execute();
            $produtos = $ps->fetchAll(PDO::FETCH_ASSOC);

            return $this->codificarImagensEmBase64($produtos);
        } catch (\PDOException $e) {
            throw new ProdutoException($e->getMessage());
        }
    }

    public function obterProdutoPeloID(int $id)
    {
        try {
            $sql = 'SELECT * FROM produtos WHERE id = :id';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':id', $id, PDO::PARAM_INT);
            $ps->execute();
            $produto = $ps->fetchAll(PDO::FETCH_ASSOC);

            return $this->codificarImagensEmBase64($produto);
        } catch (\PDOException $e) {
            throw new ProdutoException($e->getMessage());
        }
    }

    // public function codificarImagensEmBase64($produtos)
    // {
    //     try {
    //         foreach ($produtos as $key => $produto) {
    //             $produtos[$key]['imagem'] = base64_encode($produto['imagem']);
    //         }

    //         return $produtos;
    //     } catch (\PDOException $e) {
    //         throw $e;
    //     }
    // }

}

?>
