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
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    imagemUrl: '',
  };

  produtos: Produto[] = [];

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }
salvar() {
  // Encontra o maior ID atual
  const maiorId = this.produtos.length
    ? Math.max(...this.produtos.map(p => p.id || 0))
    : 0;

  // Atribui um novo ID
  const novoProduto: Produto = {
    ...this.produto,
    id: maiorId + 1
  };

  this.produtosService.adicionarProduto(novoProduto).subscribe(() => {
    alert('Produto cadastrado com sucesso!');
    this.produto = { nome: '', descricao: '', preco: 0, imagemUrl: '' };
    this.carregarProdutos();
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
}
