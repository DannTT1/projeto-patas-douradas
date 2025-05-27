import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './types/types';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private readonly API = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  adicionarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
