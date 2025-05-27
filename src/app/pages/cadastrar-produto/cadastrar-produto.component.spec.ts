import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarProdutosComponent } from './cadastrar-produto.component';

describe('CadastrarProdutoComponent', () => {
  let component: CadastrarProdutosComponent;
  let fixture: ComponentFixture<CadastrarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarProdutosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
