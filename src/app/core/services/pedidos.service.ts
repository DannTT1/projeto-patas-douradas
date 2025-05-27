import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private readonly API = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  salvarPedido(pedido: any): Observable<any> {
    return this.http.post(this.API, pedido);
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  atualizar(pedido: any): Observable<any> {
    return this.http.put<any>(`${this.API}/${pedido.id}`, pedido);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
