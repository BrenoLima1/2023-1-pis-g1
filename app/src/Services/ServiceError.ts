export class ServicoError extends Error {
    constructor(mensagem: string) {
      super(mensagem);
      this.name = "ServicoError";
    }
  }