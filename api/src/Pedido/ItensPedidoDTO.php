<?php

class ItensPedidoDTO implements JsonSerializable{

    private $imagem;
    private $descricao;
	private $descontoOriginal;
    private $precoOriginal;
    private $quantidadeComprada;

    public function __construct($imagem,$descricao,$descontoOriginal,$precoOriginal,$quantidadeComprada) {
        $this->imagem = $imagem;
        $this->descricao = $descricao;
        $this->descontoOriginal = $descontoOriginal;
        $this->precoOriginal = $precoOriginal;
        $this->quantidadeComprada = $quantidadeComprada;
    }

	#[\ReturnTypeWillChange]
	public function jsonSerialize() {
        $json = [
			'imagem' => $this->imagem,
			'descricao' => $this->descricao,
			'desconto_original' => $this->descontoOriginal,
			'preco_original' => $this->precoOriginal,
            'quantidade_comprada' => $this->quantidadeComprada
		];

		return $json;
    }
}

?>
