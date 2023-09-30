<?php
require_once('RepositorioAlunoEmPDO.php');
require_once('AlunoView.php');
require_once('Aluno.php');
require_once(__DIR__.'/../util/sessao.php');
require_once(__DIR__.'/../Connection/config.php');
require_once(__DIR__.'/../Exception/AlunoException.php');

class AlunoController{
    private $alunoEmPDO;
    private $alunoView;
    public function __construct() {
        $this->alunoEmPDO = new AlunoEmPDO(conexaoPDO());
        $this->alunoView = new AlunoView();
    }

    public function validarSessao()
    {
        if(verificarSessao()){
           $this->alunoView->exibirDados('Autorizado');
        }else{
            $this->alunoView->exibirErroSessao('Não autorizado');
        }
    }

    public function login()
    {
        $login = isset($_POST['login']) ? htmlspecialchars($_POST['login']) : null;
        $senha = isset($_POST['senha']) ? htmlspecialchars($_POST['senha']) : null;
        try {
            $usuario = $this->alunoEmPDO->login($login, $senha);

            if($usuario){
                iniciarSessaoLogin();
                salvarIDNaSessao($usuario['id']);
                $this->alunoView->exibirDados($usuario['nome']);
            }else{
                $this->alunoView->exibirErroSessao('Não autorizado');
            }
        } catch (\AlunoException $e) {
            $this->alunoView->exibirErroServidor($e->getMessage());
        }
    }

    public function logout()
    {
        destruirSessao();
        $this->alunoView->exibirMensagemLogout();
    }

    public function obterDados()
    {
        try {
                iniciarSessao();
                $alunoData = $this->alunoEmPDO->obterDados(obterIDUsuario());
                $aluno = $this->converterAluno($alunoData);
                $this->alunoView->exibirDados($aluno);
        } catch (\AlunoException $e) {
            $this->alunoView->exibirErroServidor($e->getMessage());
        }
    }

    public function converterAluno ($alunoData)
    {

        return  new Aluno(
                $alunoData['id'],
                $alunoData['nome'],
                $alunoData['matricula'],
                $alunoData['saldo'],
                $alunoData['email'],
                $alunoData['senha']
            );
    }

    public function verificarSessao()
    {
        if(verificarSessao()){
            $this->alunoView->exibirDados('Autorizado');
        }else{
            $this->alunoView->exibirErroSessao('Não autorizado');
        }
    }

}
?>
