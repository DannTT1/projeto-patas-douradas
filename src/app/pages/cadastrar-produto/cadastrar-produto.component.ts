import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosService } from '../../core/produtos.service';
import { Produto } from '../../core/types/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css'],
})
export class CadastrarProdutosComponent implements OnInit {
  produto: Produto = this.novoProdutoVazio();
  produtos: Produto[] = [];

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

salvar() {
  const maiorId = this.produtos.length
    ? Math.max(...this.produtos.map(p => Number(p.id) || 0))
    : 0;

  const novoId = (maiorId + 1).toString(); // << garante ID como string

  const novoProduto: Produto = {
    ...this.produto,
    id: novoId,
    imagem: this.ajustarImagem(this.produto.imagem || '')
  };

  this.produtosService.adicionarProduto(novoProduto).subscribe({
    next: () => {
      alert('✅ Produto cadastrado com sucesso!');
      this.produto = this.novoProdutoVazio();
      this.carregarProdutos();
    },
    error: (err) => {
      console.error('❌ Erro ao salvar produto:', err);
      alert('Erro ao salvar produto!');
    }
  });
}


  carregarProdutos() {
    this.produtosService.listar().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  voltar() {
    this.router.navigate(['/pedidos']);
  }

  private novoProdutoVazio(): Produto {
    return {
      nome: '',
      descricao: '',
      preco: 0,
      imagem: ''
    };
  }

  private ajustarImagem(imagem: string): string {
    if (imagem.startsWith('http')) {
      return imagem.trim();
    }
    const partes = imagem.split(/(\\|\/)/g);
    return partes[partes.length - 1].trim();
  }

  getImagemUrl(imagem: string): string {
    if (!imagem) return '';
    return imagem.startsWith('http') ? imagem : `/public/${imagem}`;
  }
}
