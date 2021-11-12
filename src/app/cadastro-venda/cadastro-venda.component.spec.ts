import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVendaComponent } from './cadastro-venda.component';

describe('CadastroVendaComponent', () => {
  let component: CadastroVendaComponent;
  let fixture: ComponentFixture<CadastroVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
