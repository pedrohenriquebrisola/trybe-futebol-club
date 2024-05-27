# Boas vindas ao repositório do Trybe Futebol Clube!
O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

Descrição do Projeto
No time de desenvolvimento do TFC, fui responsável por desenvolver uma API e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, eu construí um back-end dockerizado utilizando modelagem de dados através do Sequelize. Respeitando as regras de negócio providas no projeto e fazendo a API ser capaz de ser consumida por um front-end já provido nesse projeto pela Trybe.


# Instruções de Instalação :)
Passo 1: Instalar Dependências
Na raiz do projeto, execute os seguintes comandos para instalar as dependências:
npm install
npm run install:apps

Passo 2: Levantar os Containers
Utilize o Docker Compose para levantar os containers da aplicação:
npm run compose:up

Passo 3: Iniciar o Back-end
Na pasta app/backend, execute o comando para iniciar o back-end:
npm run prestart
