import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/types/types';
import { ProdutosService } from '../../core/produtos.service';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { FooterSiteComponent } from '../footer-site/footer-site.component';

@Component({
  selector: 'app-loja-cliente',
  standalone: true,
  templateUrl: './loja-cliente.component.html',
  styleUrls: ['./loja-cliente.component.css'],
  imports: [CommonModule, RouterModule, HeaderClienteComponent,FooterSiteComponent],
})
export class LojaClienteComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.produtosService.listar().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionar(produto);
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  }

  // ✅ Função para tratar imagens locais ou via URL externa
  getImagemUrl(imagem: string): string {
    if (!imagem) return '';
    return imagem.startsWith('http') ? imagem : `/public/${imagem}`;
  }
}
