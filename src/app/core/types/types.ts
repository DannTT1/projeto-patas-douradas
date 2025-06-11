export interface Produto {
  id?: number | string; // aceita string ou number
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}


export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}
