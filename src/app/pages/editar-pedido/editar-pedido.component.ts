import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../core/services/pedidos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css'],
})
export class EditarPedidoComponent implements OnInit {
  pedido: any;

  constructor(
    private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pedidosService.buscarPorId(id!).subscribe((p) => (this.pedido = p));
  }

  salvar(): void {
    this.pedidosService.atualizar(this.pedido).subscribe(() => {
      alert('Pedido atualizado com sucesso!');
      this.router.navigate(['/pedidos']);
    });
  }

  voltar(): void {
    this.location.back();
  }
}
