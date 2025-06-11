import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../core/services/pedidos.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component'; // ✅

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, HeaderAdminComponent], // ✅
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private router: Router, private location: Location, private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosService.listar().subscribe((dados: any[]) => {
      this.pedidos = dados.map(pedido => ({
        ...pedido,
        total: pedido.itens?.reduce((acc: number, item: any) => acc + (item.preco || 0), 0)
      }));
    });
  }

 

  editarPedido(pedido: any): void {
    this.router.navigate([`/editar-pedido/${pedido.id}`]);
  }

  excluirPedido(id: number): void {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.pedidosService.excluir(id).subscribe(() => {
        this.pedidos = this.pedidos.filter(p => p.id !== id);
      });
    }
  }
}
