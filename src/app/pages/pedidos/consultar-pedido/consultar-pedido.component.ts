import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../core/services/pedidos.service';
import { Location } from '@angular/common'; // ✅ IMPORTAÇÃO ADICIONADA

@Component({
  selector: 'app-consultar-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent {
  termo: string = '';
  resultados: any[] = [];

  constructor(
    private pedidosService: PedidosService,
    private location: Location // ✅ INJEÇÃO ADICIONADA
  ) {}

  consultar(): void {
    this.pedidosService.listar().subscribe(pedidos => {
      this.resultados = pedidos.filter(p =>
        p.cliente?.nome?.toLowerCase().includes(this.termo.toLowerCase()) ||
        p.cliente?.email?.toLowerCase().includes(this.termo.toLowerCase()) ||
        p.cliente?.telefone?.includes(this.termo)
      );
    });
  }

  getTotal(pedido: any): number {
    return pedido.itens?.reduce((t: number, i: any) => t + (i.preco || 0), 0) || 0;
  }

  voltar(): void {
    this.location.back(); // ✅ AÇÃO DE VOLTAR
  }
}
