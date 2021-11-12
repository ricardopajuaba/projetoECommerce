import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  //atributo
  mensagem_sucesso: string = "";
  mensagem_erro: string = "";

  constructor(
    private httpClient: HttpClient //inicialização por injeção de dependência
  ) { }

  //definindo o formulário
  formCadastro = new FormGroup({

    /* CAMPOS PARA CADASTRO DO CLIENTE */
    nome: new FormControl('', [Validators.required, Validators.minLength(10)]),
    cpf: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    senhaConfirmacao: new FormControl('', [Validators.required]),

    /* CAMPOS PARA CADASTRO DO ENDEREÇO */
    cep: new FormControl('', [Validators.required]),
    logradouro: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    complemento: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  });

  //ler os erros de validação dos campos do formulário
  get form(): any {
    return this.formCadastro.controls;
  }

  ngOnInit(): void {
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    //limpar as mensagens
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    //capturar os dados do cliente
    var cliente = {
      nome: this.formCadastro.controls.nome.value,
      cpf: this.formCadastro.controls.cpf.value,
      telefone: this.formCadastro.controls.telefone.value,
      email: this.formCadastro.controls.email.value,
      senha: this.formCadastro.controls.senha.value,
      senhaConfirmacao: this.formCadastro.controls.senhaConfirmacao.value,
    };

    //executando o cadastro do cliente na API..
    this.httpClient.post(environment.apiECommerce + "clientes", cliente)
      .subscribe(
        (data: any) => {

          this.mensagem_sucesso += data.message;

          //cadastrar o endereço do cliente
          var endereco = {
            cep: this.formCadastro.controls.cep.value,
            logradouro: this.formCadastro.controls.logradouro.value,
            numero: this.formCadastro.controls.numero.value,
            complemento: this.formCadastro.controls.complemento.value,
            bairro: this.formCadastro.controls.bairro.value,
            cidade: this.formCadastro.controls.cidade.value,
            estado: this.formCadastro.controls.estado.value,
            emailCliente: this.formCadastro.controls.email.value
          };

          //executando o cadastro do endereço na API..
          this.httpClient.post(environment.apiECommerce + "enderecos", endereco)
            .subscribe(
              (data: any) => {

                this.mensagem_sucesso += " " + data.message;

                //limpar os campos do formulário
                this.formCadastro.reset();

              },
              (e: any) => {
                this.mensagem_erro = e.error.message;
              }
            )

        },
        (e: any) => {
          this.mensagem_erro = e.error.message;
        }
      )

  }

  obterEndereco(): void {

    var cep = this.formCadastro.controls.cep.value;

    if (cep.length >= 8) {
      this.httpClient.get(environment.apiViaCep + cep + "/json")
        .subscribe(
          (data: any) => {
            //preenchendo os campos do formulário
            this.formCadastro.controls.logradouro.setValue(data.logradouro);
            this.formCadastro.controls.bairro.setValue(data.bairro);
            this.formCadastro.controls.cidade.setValue(data.localidade);
            this.formCadastro.controls.estado.setValue(data.uf);
          },
          (e) => {
            console.log(e);
          }
        )
    }

  }
}
