<?php

function iniciarSessao()
{
    session_name('cefetshop');
    session_start();
}

function iniciarSessaoLogin()
{
    iniciarSessao();
    session_regenerate_id(true);
    $_SESSION['loggedin'] = true;
}

function salvarIDNaSessao($id)
{
    $_SESSION['id'] = $id;
}

function obterIDUsuario(){
    return intval($_SESSION['id']);
}

function destruirSessao(){
        iniciarSessao();
        session_destroy();
}

function verificarSessao(){
    iniciarSessao();
    if (session_status() === PHP_SESSION_ACTIVE && isset($_SESSION['id'], $_SESSION['loggedin'])) {
        return $_SESSION['loggedin'];
    }
}
