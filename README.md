# Teste Técnico - Chico Rei

Este projeto é um site front-end de uma loja virtual, desenvolvido como parte de um teste técnico para a Chico Rei. Ele inclui as seguintes seções principais:

*   **Home:** Página inicial com banners promocionais.
*   **Produtos:** Listagem de produtos com filtro por categoria.
*   **Checkout:** Formulário de finalização de pedido com validações e integração com API de CEP.

O site foi desenvolvido com responsividade, adaptando-se a diferentes tamanhos de tela (desktop e mobile).

## Tecnologias Utilizadas

*   **Vue.js:** Framework JavaScript para construção da interface de usuário.
*   **Vue Router:** Biblioteca para gerenciamento das rotas do site.
*   **LESS:** Pré-processador CSS para estilização.
*   **JavaScript (ES6+):** Linguagem de programação para a lógica da aplicação.
*   **cep-promise:** Biblioteca para integração com a API de CEP (BrasilAPI).

## Instruções para Executar o Projeto

Siga as instruções abaixo para rodar o projeto em seu ambiente local.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/)



### Estrutura de Arquivos

*   `src/`: Contém o código fonte do projeto.
*   `src/components`: Contém os componentes Vue reutilizáveis.
*   `src/views`: Contém os componentes que representam as páginas do site (Home, Produtos, Checkout).
*   `src/router`: Contém a configuração das rotas do Vue Router.
*   `public`: Contém os arquivos estáticos (imagens, favicon, etc.).
