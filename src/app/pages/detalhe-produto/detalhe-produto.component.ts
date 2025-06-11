import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../core/types/types';
import { ProdutosService } from '../../core/produtos.service';
import { CommonModule } from '@angular/common';
import { FooterSiteComponent } from '../footer-site/footer-site.component';

@Component({
  selector: 'app-detalhe-produto',
  standalone: true,
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css'],
  imports: [CommonModule,FooterSiteComponent],
})
export class DetalheProdutoComponent implements OnInit {
  produto!: Produto;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtosService.buscarPorId(id).subscribe((produto) => {
      this.produto = produto;
    });
  }

  voltar(): void {
    this.location.back();
  }

  getImagemUrl(imagem: string): string {
    return imagem?.startsWith('http') ? imagem : `/public/${imagem}`;
  }
}
