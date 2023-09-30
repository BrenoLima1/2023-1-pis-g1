<?php
require_once('vendor/autoload.php');
require_once('src/Connection/config.php');

describe('conexaoPDO', function() {
    it('returna uma intância de PDO', function() {
        $pdo = conexaoPDO();
        expect($pdo)->toBeAnInstanceOf(PDO::class);
    });
});




?>
