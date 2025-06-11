import { Routes } from '@angular/router';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { CadastrarProdutosComponent } from './pages/cadastrar-produto/cadastrar-produto.component';

export const routes: Routes = [
  { path: '', component: EntradaComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  {
    path: 'editar-pedido/:id',
    loadComponent: () =>
      import('./pages/editar-pedido/editar-pedido.component').then(
        (m) => m.EditarPedidoComponent
      ),
  },
  {
    path: 'consultar',
    loadComponent: () =>
      import(
        './pages/pedidos/consultar-pedido/consultar-pedido.component'
      ).then((m) => m.ConsultarPedidoComponent),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/cliente/cliente.routes').then((m) => m.CLIENTE_ROUTES),
  },
  {
    path: 'cadastrar-produtos',
    component: CadastrarProdutosComponent,
  },
  {
    path: 'excluir-produto',
    loadComponent: () =>
      import('./pages/excluir-produto/excluir-produto.component').then(
        (m) => m.ExcluirProdutoComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
