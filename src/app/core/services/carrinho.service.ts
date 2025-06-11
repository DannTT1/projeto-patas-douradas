import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private carrinho: any[] = [];
  adicionar(produto: any): void {
    this.carrinho.push(produto);
  }
  limpar(): void {
    this.carrinho = [];
  }
  remover(index: number): void {
    this.carrinho.splice(index, 1);
  }
  getItens(): any[] {
    return this.carrinho;
  }
  getTotal(): number {
    return this.carrinho.reduce((total, p) => total + p.preco, 0);
  }
}
