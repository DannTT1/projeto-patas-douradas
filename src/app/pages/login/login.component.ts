import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';
  erro: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  login(): void {
    this.http.get<any[]>('http://localhost:3000/admin').subscribe((admins) => {
      const admin = admins.find(
        (a) => a.usuario === this.usuario && a.senha === this.senha
      );
      if (admin) {
        this.router.navigate(['/pedidos']);
      } else {
        this.erro = 'Usuário ou senha inválidos.';
      }
    });
  }

  voltar(): void {
    this.location.back();
  }
}
