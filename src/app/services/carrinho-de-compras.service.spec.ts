import { TestBed } from '@angular/core/testing';

import { CarrinhoDeComprasService } from './carrinho-de-compras.service';

describe('CarrinhoDeComprasService', () => {
  let service: CarrinhoDeComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoDeComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
