import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../core/services/pedidos.service';
@Component({
  selector: 'app-listar-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css'],
})
export class ListarPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosService.listar().subscribe((dados) => {
      this.pedidos = dados;
    });
  }
}
