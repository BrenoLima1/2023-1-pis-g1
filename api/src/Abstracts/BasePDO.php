<?php

abstract class BasePDO{

    public function codificarImagensEmBase64($itens)
    {
        try {
            foreach ($itens as $key => $item) {
                $itens[$key]['imagem'] = base64_encode($item['imagem']);
            }

            return $itens;
        } catch (\PDOException $e) {
            throw $e;
        }
    }
}

?>
