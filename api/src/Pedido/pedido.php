<?php

class Pedido implements JsonSerializable{

    private $id;
    private $idAluno;
	private $dataHora;
    private $total;
    private $itensPedido;

    public function __construct($id,$idAluno,$dataHora,$total) {
        $this->id = $id;
        $this->idAluno = $idAluno;
		$this->dataHora = $dataHora;
        $this->total = $total;
    }

	#[\ReturnTypeWillChange]
	public function jsonSerialize() {
        $json = [
			'id' => $this->id,
			'id_aluno' => $this->idAluno,
			'data_hora' => $this->dataHora,
			'total' => $this->total,
			'itens_pedido' => $this->itensPedido
		];

		return $json;
    }

    public function processarPedido()
    {
        # code...
    }

	public function setItens($itens){
		if(!$this->itensPedido){
			$this->itensPedido = [];
		}
		$this->itensPedido = array_merge($this->itensPedido, $itens);
	}

	/**
	 * @return mixed
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @param mixed $id
	 * @return self
	 */
	public function setId($id): self {
		$this->id = $id;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getIdAluno() {
		return $this->idAluno;
	}

    	/**
	 * @param mixed $id
	 * @return self
	 */
	public function setIdAluno($idAluno): self {
		$this->idAluno = $idAluno;
		return $this;
	}


}

?>
