import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClientesComponent } from './login-clientes.component';

describe('LoginClientesComponent', () => {
  let component: LoginClientesComponent;
  let fixture: ComponentFixture<LoginClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
