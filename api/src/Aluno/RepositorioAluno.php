<?php

interface RepositorioAluno{
    public function obterDados(int $id);

    public function realizarCompra(array $itens);

    public function login($login, $senha);
}

?>
