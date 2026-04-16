# Folha Lida

Aplicação web para registrar livros, acompanhar o status de leitura, salvar notas de leitura e visualizar métricas em dashboard.

## Sobre o projeto

O **Folha Lida** é uma biblioteca pessoal digital onde o usuário pode:

- criar uma conta e fazer login
- cadastrar livros
- editar e excluir livros
- filtrar e paginar registros
- adicionar notas de leitura vinculadas a cada livro
- acompanhar métricas em um dashboard com gráficos

O projeto foi desenvolvido como solução para um teste técnico de front-end, com foco em organização de código, componentização, autenticação simulada com JWT e experiência de uso.

---
## Como rodar o projeto

### 1. Clonar o repositório

git clone URL_DO_SEU_REPOSITORIO

### 2. Entrar na pasta do projeto

cd folha_lida

### 3. Instalar dependências

npm install

### 4. Rodar em ambiente de desenvolvimento

npm run dev

A aplicação estará disponível em: 
http://localhost:3000

### Gerar build de produção

npm run build

### Rodar os testes

npm run dev

---


## Funcionalidades implementadas

### Páginas obrigatórias

- **Home (`/`)**
  - homepage simples
  - navegação para login e cadastro
  - apresentação do propósito da aplicação

- **Login (`/login`)**
  - autenticação com email e senha
  - persistência de token mockado
  - redirecionamento após autenticação

- **Cadastro (`/register`)**
  - registro de usuário com nome, email e senha
  - validação de email já cadastrado

- **Dashboard (`/dashboard`)**
  - rota protegida
  - exibição de métricas e gráficos
  - acesso permitido apenas com token válido

- **CRUD (`/crud`)**
  - listagem de livros cadastrados
  - criação, edição e exclusão de livros
  - filtros e paginação

### Extras implementados

- filtro por nome
- filtro por status
- ordenação por data de criação
- paginação com 6, 12 e 24 itens por página
- notas de leitura por livro
- dashboard com gráficos e cards de resumo
- proteção de rotas com autenticação mockada
- testes unitários de services

---

## Tecnologias utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Zustand**
- **Vitest**
- **UUID**

---

## Decisões técnicas

### 1. Next.js com App Router
Foi utilizado o Next.js com App Router para estruturar as páginas da aplicação de forma moderna e organizada, facilitando a separação entre rotas públicas e protegidas.

### 2. TypeScript
O TypeScript foi adotado para melhorar a tipagem da aplicação, reduzir erros e tornar a manutenção do código mais segura.

### 3. Zustand para gerenciamento de estado
O Zustand foi escolhido por ser uma solução simples e direta para gerenciamento de estado global, suficiente para o porte do projeto e mais leve que alternativas mais complexas.

### 4. Persistência com localStorage
Como o projeto utiliza dados mockados, a persistência foi feita com `localStorage`, permitindo manter usuários autenticados, livros e notas mesmo após recarregar a página.

### 5. JWT mockado
A autenticação foi simulada com geração e validação de token mockado, para atender ao requisito do teste sem depender de uma API real.

### 6. Arquitetura baseada em Atomic Design
Os componentes foram organizados seguindo a lógica de Atomic Design, separando atoms, molecules, organisms e templates para melhorar reutilização, legibilidade e escalabilidade.

### 7. Dashboard com dados reais do próprio CRUD
O dashboard foi construído a partir dos livros e notas cadastrados pelo próprio usuário, evitando dados estáticos e tornando a interface mais coerente com a proposta da aplicação.

---

## Estrutura do projeto

src/
  app/
  components/
    atoms/
    molecules/
    organisms/
    templates/
  services/
  store/
  types/
  utils/


## Screenshots da aplicação

### Home
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/162741c8-14d1-4db7-b4db-5ca244b23128" />

### Login
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fd28d138-dc39-41a3-b1c5-f709f3942fc3" />

### Cadastro
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0d0fb87b-acbc-48ea-8685-e1503519cb65" />

### CRUD de livros
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/18627b7d-b2fc-4a56-bf64-0aaf83028399" />

### Cadastro de livro
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d58f1f7e-ca87-4c04-bf9a-aad9f095ece4" />

### Detalhes do livro e notas de leitura
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0b05106c-7f10-4aa3-b722-82ec776d1391" />

### Dashboard
<img width="1920" height="1397" alt="image" src="https://github.com/user-attachments/assets/9a0c92f2-2035-4f01-963e-1dc34441e7b5" />

