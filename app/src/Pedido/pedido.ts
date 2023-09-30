import { ItensPedido } from "./itens-pedido.js";

export class Pedido{
    public id: number;
    public id_aluno: number;
    public data_hora: string;
    public total: number;
    public itens_pedido: ItensPedido[];

    constructor(id: number, id_aluno: number, data_hora: string, total: number, itens_pedido : ItensPedido[]) {
        this.id = id;
        this.id_aluno = id_aluno;
        this.data_hora = data_hora;
        this.total = total;
        this.itens_pedido = itens_pedido;
    }
}
