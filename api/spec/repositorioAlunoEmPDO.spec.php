<?php
require_once('vendor/autoload.php');
require_once('src/Aluno/Aluno.php');
require_once('src/Aluno/RepositorioAlunoEmPDO.php');
require_once('src/Connection/config.php');


describe('AlunoEmPDO', function () {
    $this->pdo = conexaoPDO();
    $this->aluno1emPDO = new AlunoEmPDO($this->pdo);

    describe('realizar login', function () {
        it('deve retornar o usuário que realizou login', function() {
            expect($this->aluno1emPDO->login('2011123GSIS', '123'))->toBe([
                'id' => 3,
                'nome' => 'José Carlos Augusto',
                'matricula' => '2011123GSIS',
                'saldo' => '0.00',
                'senha' => '$2y$10$3wrDOZsK1./xAxHF.LNub..M.6JPxH/H2GW3zz5FpZxo9v5aOAkgC',
                'email' => 'joseCarlosAugusto@cefet.com'
            ]);

        });

        it('deve retornar null para senha inválida', function() {
            expect($this->aluno1emPDO->login('2011123GSIS', ' '))->toBe(null);

        });

        it('deve retornar null para login inválido', function() {
            expect($this->aluno1emPDO->login(' ', '123'))->toBe(null);

        });

        it('deve retornar todos os dados, exceto a senha, de aluno em obterDados', function() {
            expect($this->aluno1emPDO->obterDados(3))->toBe(['id' => 3,
            'nome' => 'José Carlos Augusto',
            'matricula' => '2011123GSIS',
            'saldo' => '0.00',
            'senha' => '',
            'email' => 'joseCarlosAugusto@cefet.com']);

        });
        });


    });
