# projeto10-cineflex

O projeto "Cineflex" é uma aplicação front-end React, que permite ao usuário reservar assentos numa sessão de cinema. Na página inicial podem ser vistos todos os filmes sendo exibidos, e em sessões os horários em que o filme selecionado está sendo exibido. A aplicação também permite a seleção dos assentos para reserva, e então exibe uma página específica em caso de sucesso. 

## Rodar localmente com Docker

E para testar localmente, primeiro clone o projeto a partir desse repositório:
```bash
  https://github.com/Isabel-Dias/projeto10-cineflex
```

Vá para a pasta do projeto.

Na pasta do projeto, abra o terminal e digite o seguinte comando:


```bash
  npm install
```

E para rodar o projeto localmente e testar as funcionalidades, crie e configure o documento .env na pasta src. 

Para configurar o .env, siga o exemplo dado no .env.example.

Para configurar o [Docker](https://www.docker.com/), rode o seguinte comando pra criar a imagem docker:

```bash
  docker docker build -t cineflex-app . 
```
E então rode o container docker com o seguinte comando:

```bash
  docker run -d --name cineflex-app -p 8080:80 cineflex-app
```

Por fim, digite o seguinte comando no terminal:

```bash
  npm run dev
```