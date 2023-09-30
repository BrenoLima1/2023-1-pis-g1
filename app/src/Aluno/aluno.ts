export class Aluno{

    public ALUNO: string = 'aluno';
    private id: number;
    public nome: string;
    public email: string;
    public matricula: string;
    public saldo: number;
    public senha: string;

    constructor(id: number, nome: string, email: string, matricula: string, saldo: number, senha: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.matricula = matricula;
        this.saldo = saldo;
        this.senha = senha;
    }

    public static salvarNomeLocalmente(nome: string) {
        localStorage.setItem('nome-aluno', nome);
    }

    public static obterNome(): string{
        return JSON.parse(localStorage.getItem('nome-aluno')!).split(' ')[0];
    }

    public static limparCache(){
        localStorage.clear();
    }

    public static logout(){
        this.limparCache();
       this.expirarCookie();
    }

    public static expirarCookie(){
        let dataExpiracao = new Date('2000-01-01').toUTCString();
        let cookieString = 'cefetshop=; expires=' + dataExpiracao + '; path=/';
        document.cookie = cookieString;
    }

    public static validarCookie() {
        return (document.cookie.indexOf('cefetshop') >= 0) ? true : false;
    }

    public static validarNome(){
        return localStorage.getItem('nome-aluno') ? true: false;
    }

}
