<?php

class Aluno implements JsonSerializable{

    private $id;
    private $nome;
    private $email;
    private $senha;
    private $matricula;
    private $saldo;

    public function __construct($id, $nome, $matricula, $saldo, $email, $senha) {
        $this->id = $id;
        $this->nome = $nome;
        $this->matricula = $matricula;
        $this->saldo = $saldo;
        $this->email = $email;
        $this->senha = $senha;
    }

	#[\ReturnTypeWillChange]
	public function jsonSerialize() {
        $json = [
			'id' => $this->id,
			'nome' => $this->nome,
			'matricula' => $this->matricula,
			'saldo' => $this->saldo,
			'email' => $this->email,
			'senha' => $this->senha,
		];

		return $json;
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
	public function getId() {
		return $this->id;
	}

	/**
	 * @param mixed $nome
	 * @return self
	 */
	public function setNome($nome): self {
		$this->nome = $nome;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getNome() {
		return $this->nome;
	}

	/**
	 * @param mixed $email
	 * @return self
	 */
	public function setEmail($email): self {
		$this->email = $email;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * @param mixed $senha
	 * @return self
	 */
	public function setSenha($senha): self {
		$this->senha = $senha;
		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getSenha() {
		return $this->senha;
	}

	/**
	 * @param mixed $matricula
	 * @return self
	 */
	public function setMatricula($matricula): self {
		$this->matricula = $matricula;
		return $this;
	}

    public function getMatricula() {
		return $this->matricula;
	}

	/**
	 * @return mixed
	 */
	public function getSaldo() {
		return $this->saldo;
	}

	/**
	 * @param mixed $saldo
	 * @return self
	 */
	public function setSaldo($saldo): self {
		$this->saldo = $saldo;
		return $this;
	}
}

?>
