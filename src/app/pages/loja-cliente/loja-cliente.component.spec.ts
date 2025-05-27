import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaClienteComponent } from './loja-cliente.component';

describe('LojaClienteComponent', () => {
  let component: LojaClienteComponent;
  let fixture: ComponentFixture<LojaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaClienteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LojaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
