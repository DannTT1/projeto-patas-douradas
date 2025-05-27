import { Routes } from '@angular/router';
import { LojaClienteComponent } from '../loja-cliente/loja-cliente.component';
import { DetalheProdutoComponent } from '../detalhe-produto/detalhe-produto.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
export const CLIENTE_ROUTES: Routes = [
  { path: '', component: LojaClienteComponent },
  { path: 'produto/:id', component: DetalheProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
];
