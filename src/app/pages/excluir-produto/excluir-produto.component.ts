import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../core/produtos.service';
import { Router } from '@angular/router';
import { Produto } from '../../core/types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excluir-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excluir-produto.component.html',
  styleUrls: ['./excluir-produto.component.css'],
})
export class ExcluirProdutoComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtosService.listar().subscribe((res) => {
      this.produtos = res;
    });
  }

excluir(id: string | number): void {
  if (!id) return;

  if (confirm('Tem certeza que deseja excluir este produto?')) {
    this.produtosService.excluir(id).subscribe(() => {
      this.produtos = this.produtos.filter(p => String(p.id) !== String(id));
    });
  }
}


  voltar(): void {
    this.router.navigate(['/pedidos']);
  }

  getImagemUrl(imagem: string): string {
    if (!imagem) return '';
    return imagem.startsWith('http') ? imagem : `/public/${imagem}`;
  }
}
