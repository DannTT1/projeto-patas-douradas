import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
})
export class EntradaComponent {
  constructor(private router: Router) {}

  entrarComoCliente(): void {
    this.router.navigate(['/cliente']);
  }

  entrarComoAdmin(): void {
    this.router.navigate(['/login']);
  }
}
