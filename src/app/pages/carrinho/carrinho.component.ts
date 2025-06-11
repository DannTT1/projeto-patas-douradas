import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Produto, Cliente } from '../../core/types/types';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FooterSiteComponent } from '../footer-site/footer-site.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  imports: [CommonModule, FormsModule,FooterSiteComponent],
})
export class CarrinhoComponent implements OnInit {
  itens: Produto[] = [];
  cliente: Cliente = { nome: '', email: '', telefone: '' };

  constructor(
    private location: Location,
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService,
    private http: HttpClient
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

    // Buscar todos os pedidos para determinar o próximo ID
    this.http.get<any[]>('http://localhost:3000/pedidos').subscribe(pedidos => {
      const ultimoId = pedidos.length
        ? Math.max(...pedidos.map(p => Number(p.id) || 0))
        : 0;

      const pedido = {
        id: (ultimoId + 1).toString(), // ID incremental como string
        data: new Date().toISOString(),
        cliente: this.cliente,
        itens: this.itens
      };

      this.pedidosService.salvarPedido(pedido).subscribe(() => {
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

  getImagemUrl(imagem: string): string {
    return imagem?.startsWith('http') ? imagem : `/public/${imagem}`;
  }
}
