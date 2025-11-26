# API Pets (simples) - Node.js + Sequelize + MariaDB

### Passos para rodar (Linux Mint / VSCode)

1. Instale MariaDB e crie um banco:
   - instale: sudo apt install mariadb-server
   - iniciar: sudo systemctl start mariadb
   - entrar: sudo mysql
   - criar banco: CREATE DATABASE api_pets_db;
   - criar usuário opcional: CREATE USER 'apiuser'@'localhost' IDENTIFIED BY 'sua_senha';
   - permitir: GRANT ALL PRIVILEGES ON api_pets_db.* TO 'apiuser'@'localhost';
2. Copie `.env.example` para `.env` e ajuste DB_USER, DB_PASS, DB_NAME se precisar.
3. No projeto:
   - npm install
   - node server.js
4. Endpoints principais:
   - POST /auth/register { cpf,nome,email,password }
   - POST /auth/login { cpf,password } -> { token }
   - POST /pets (protegido com header Authorization: Bearer <token>)
   - GET /pets, GET /pets/by-tutor/:cpf, GET /pets/by-altura/:altura
   - CRUD de tutors em /tutores

Observações:
- O projeto usa Sequelize (ORM) e cria as tabelas automaticamente ao iniciar.
- As alturas são seeded automaticamente: pequeno (id=1), medio (id=2), alto (id=3).
# N3-Server-Sider
