import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoDeComprasComponent } from './carrinho-de-compras.component';

describe('CarrinhoDeComprasComponent', () => {
  let component: CarrinhoDeComprasComponent;
  let fixture: ComponentFixture<CarrinhoDeComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoDeComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoDeComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
