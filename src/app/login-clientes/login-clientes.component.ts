import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html',
  styleUrls: ['./login-clientes.component.css']
})
export class LoginClientesComponent implements OnInit {

  //atributo
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  //formulário de login de clientes
  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  })

  //função para exibir as mensagens de validação dos campos
  get form(): any {
    return this.formLogin.controls;
  }

  ngOnInit(): void {

  }

  //função para capturar o submit do formulario
  onSubmit(): void {

    this.httpClient.post(environment.apiECommerce + 'login', this.formLogin.value)
      .subscribe(
        (data: any) => {
         
          //gravar os dados obtidos da API em LOCAL STORAGE
          localStorage.setItem('DADOS_CLIENTE', JSON.stringify(data));

          //redirecionar para a página de cadastro de venda
          this.router.navigate(['/cadastro-vendas']);
        },
        (e: any) => {
          this.mensagem_erro = e.error.message;
        }
      )

  }

}
