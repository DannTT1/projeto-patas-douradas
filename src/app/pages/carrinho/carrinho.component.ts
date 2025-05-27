import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Produto, Cliente } from '../../core/types/types';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CarrinhoComponent implements OnInit {
  itens: Produto[] = [];
  cliente: Cliente = { nome: '', email: '', telefone: '' };

  constructor(
    private location: Location,
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.itens = this.carrinhoService.getItens();
  }

  remover(index: number): void {
    this.carrinhoService.remover(index);
    this.carregarItens();
  }

  limpar(): void {
    this.carrinhoService.limpar();
    this.carregarItens();
  }

  get total(): number {
    return this.carrinhoService.getTotal();
  }

  get quantidadeTotal(): number {
    return this.itens.length;
  }

  finalizarCompra(): void {
  if (
    !this.cliente.nome ||
    !this.cliente.email ||
    !this.cliente.telefone ||
    this.itens.length === 0
  ) {
    alert('Preencha os dados do cliente e adicione itens ao carrinho.');
    return;
  }

  // Primeiro, busca todos os pedidos para calcular o próximo ID
  this.pedidosService.listar().subscribe(pedidos => {
    // Encontra o maior ID existente
    const maiorId = pedidos.length > 0
      ? Math.max(...pedidos.map(p => p.id || 0))
      : 0;

    const novoPedido = {
      id: maiorId + 1,
      data: new Date().toISOString(),
      cliente: this.cliente,
      itens: this.itens
    };

    // Envia o pedido com ID definido
    this.pedidosService.salvarPedido(novoPedido).subscribe(() => {
      alert('Compra finalizada com sucesso!');
      this.carrinhoService.limpar();
      this.carregarItens();
      this.cliente = { nome: '', email: '', telefone: '' };
    });
  });
}
voltar(): void {
  this.location.back();
}


}


