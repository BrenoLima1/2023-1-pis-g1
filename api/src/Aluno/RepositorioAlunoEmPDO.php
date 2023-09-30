<?php
require_once('RepositorioAluno.php');
class AlunoEmPDO implements RepositorioAluno{

    private $pdo;
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function login($login, $senha){
        try {
            $ps = $this->pdo->prepare('SELECT * FROM alunos WHERE email = ? OR matricula = ?');
            $ps->execute([$login,$login]);
            $data = $ps->fetch(PDO::FETCH_ASSOC);

            if (!$data || !password_verify( $senha, $data['senha'])) {
                return null;
            }

            return $data;
        } catch (PDOException $e) {
            throw new AlunoException($e->getMessage());
        }

    }

    public function obterDados(int $id){
        try {
            $sql = 'SELECT * FROM alunos WHERE id = :id';
            $ps = $this->pdo->prepare($sql);
            $ps->bindValue(':id', $id, PDO::PARAM_INT);
            $ps->execute();
            $aluno = $ps->fetch(PDO::FETCH_ASSOC);
            $aluno['senha'] = '';

            return $aluno;
        } catch (\PDOException $e) {
            throw $e;
        }
    }

    public function realizarCompra(array $itens){}
}

?>
