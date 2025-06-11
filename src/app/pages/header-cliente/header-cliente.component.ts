import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HeaderClienteComponent {}
