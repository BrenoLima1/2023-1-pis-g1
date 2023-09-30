<?php
class Produto implements JsonSerializable{

    private $id;
    private $nome;
    private $descricao;
    private $preco;
    private $descontoPercentual;
    private $imagem;
    private $quantidade;
    private $dataLancamento;
    private $vendas;

    public function __construct($id,$nome,$descricao,$preco,$descontoPercentual,$imagem,$quantidade,$dataLancamento,$vendas) {
        $this->id= $id;
        $this->nome= $nome;
        $this->descricao= $descricao;
        $this->preco= $preco;
        $this->descontoPercentual= $descontoPercentual;
        $this->imagem= $imagem;
        $this->quantidade= $quantidade;
        $this->dataLancamento= $dataLancamento;
        $this->vendas= $vendas;
    }

	#[\ReturnTypeWillChange]
	public function jsonSerialize() {
        $json = [
			'id' => $this->id,
			'nome' => $this->nome,
			'descricao' => $this->descricao,
			'preco' => $this->preco,
			'desconto_percentual' => $this->descontoPercentual,
			'imagem' => $this->imagem,
			'quantidade' => $this->quantidade,
			'data_lancamento' => $this->dataLancamento,
			'vendas' => $this->vendas,
		];

		return $json;
    }

	public function setId($id): self {
		$this->id = $id;
		return $this;
	}

	public function getId() {
		return $this->id;
	}

	public function getNome() {
		return $this->nome;
	}

	public function setNome($nome): self {
		$this->nome = $nome;
		return $this;
	}

	public function setDescricao($descricao): self {
		$this->descricao = $descricao;
		return $this;
	}

	public function getDescricao() {
		return $this->descricao;
	}

	public function setPreco($preco): self {
		$this->preco = $preco;
		return $this;
	}

	public function getPreco() {
		return $this->preco;
	}

	public function getVendas() {
		return $this->vendas;
	}

	public function setVendas($vendas): self {
		$this->vendas = $vendas;
		return $this;
	}

	public function getDataLancamento() {
		return $this->dataLancamento;
	}

	public function setDataLancamento($dataLancamento): self {
		$this->dataLancamento = $dataLancamento;
		return $this;
	}

	public function setImagem($imagem): self {
		$this->imagem = $imagem;
		return $this;
	}

	public function getImagem() {
		return $this->imagem;
	}

	public function getQuantidade() {
		return $this->quantidade;
	}

	public function getDescontoPercentual() {
		return $this->descontoPercentual;
	}

	public function setDescontoPercentual($descontoPercentual): self {
		$this->descontoPercentual = $descontoPercentual;
		return $this;
	}
}
?>
