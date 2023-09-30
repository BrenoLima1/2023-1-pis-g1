<?php

function conexaoPDO() {
    $host = 'localhost';
    $dbname = 'cefetshop';
    $user = 'root';
    $password = '';
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

    try {
        return new PDO( $dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ] );
    } catch (PDOException $e) {
        throw $e;
    }
}
?>
