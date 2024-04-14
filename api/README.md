# API REST task
API REST desenvolvida para testar conhecimento


## Importante
Para iniciar a aplicação é necessário ter o Docker instalado em sua máquina (utilizando a versão 24.0.7 ou a mais recente)
Para o funcionamento correto da aplicação é necessário definir um arquivo .env com todas as variaveis de ambiente definidas no arquivo de exemplo .env.aplicacao


Para instalar as dependencias execute o comando:
```sh
npm install
```

Iniciar a aplicação em ambiente de desenvolvimento (antes de rodar o comando certifique-se que esta com o docker instalado e iniciado). Ao iniciar o comando sera criado as devidas configurações e iniciados os testes em memória necessários para a execução da aplicação
```sh
npm run dev
```


## Testes


## Requisitos funcionais
- [] Usuário deve criar task
- [] Usuário deve editar task
- [] Usuário deve remover task
- [] Usuário deve concluir uma task
- [] Usuário deve logar na aplicação

## Requisitos não funcionais
- [] A senha de todos os usuários devem estar criptografada
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- Todos os usuários devem ser identificado por um JWT (JSON Web Token)

