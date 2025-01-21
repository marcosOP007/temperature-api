# **Sensor Management API**

## **Sobre o Projeto**

Este é meu primeiro projeto utilizando **Node.js**, **Express**, e **Sequelize**. A API foi projetada para gerenciar sensores, logs de temperatura e usuários, com recursos como autenticação, registro de usuários e gerenciamento de permissões.

O objetivo principal deste projeto é:
- Aprender os fundamentos do desenvolvimento backend.
- Praticar boas práticas como **padrão MVC**, organização de código e uso de middlewares.
- Construir uma API RESTful funcional e escalável.

Estou empolgado para compartilhar este projeto e continuar aprendendo! 🚀

---

## **Tecnologias Utilizadas**

- **Node.js**: Ambiente de execução para JavaScript no backend.
- **Express.js**: Framework para criar a API RESTful.
- **Sequelize**: ORM para interagir com o banco de dados.
- **MySQL**: Banco de dados relacional utilizado no projeto.
- **JWT**: Para autenticação baseada em tokens.
- **bcrypt**: Para hash de senhas.
- **EJS**: Para renderização de algumas páginas HTML.

---

## **Como Rodar o Projeto**

### **Pré-requisitos**
1. Node.js instalado (versão LTS recomendada).
2. MySQL ou outro banco de dados configurado.
3. Dependências instaladas via `npm install`.

### **Instruções**
1. Clone este repositório:
   ```bash
   git clone https://github.com/marcosOP007/temperature-apigit
   cd temperature-api
   ```
2. Configure o arquivo .env com as variáveis de ambiente, como:
    ```bash
   SECRET=seu_segredo_jwt
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=sua_base_de_dados
    DB_PORT=5432
   ```
3. Rode as migrações para criar as tabelas no banco:
    ````bash
    npx sequelize db:migrate
    ````
4. Inicie o servidor
    ````base
    npm run dev
    ```
5. A API estará disponível em: http://localhost:3000.


## **Endpoints**

Aqui estão os principais endpoints da API, organizados por funcionalidade. A maioria dos endpoint precisa de um nivel de autorização.

### **Autenticação**
|Método|Endpoint|Descrição|Exemplo requisição|
|------|--------|-----------|---------------|
|POST|/users/login|Login do usuário| {"email": "exemple@gmail.com, "password" : "senha123" } |
|POST|/user/register|Registro do usuário| {"email": "exemple@gmail.com, "password" : "senha123" }|
|POST|/user/logout |Logout do usuário|-|

-----------------

### **Usuário**

|Método|Endpoint|Descrição|Exemplo requisição|
|------|--------|-----------|---------------|
|GET|/users|Lista todos os usuario|-|
|GET|/users/:id|Busca um usuário por ID|-|
|PUT|/users/:id|Atualizar usuário por ID| {  "actived": false }|

---------------------
### **Canal**

|Método|Endpoint|Descrição|Exemplo requisição|
|------|--------|-----------|---------------|
|GET|/channel|lista todos os canais|-|
|GET|/channel/:id|Buscar canal por ID|-|
|POST|/channel|Crie um canal|{"name": predio 53, "sensores": 6}|
|POST|/channel/logs|cria log de temperatura|{"token": "FAG54KH23", "field1": 15, "field2": 19} |


-----------------------


