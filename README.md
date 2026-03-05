~DESAFIO FULLSTACK COGNVOX~
José Gabriel Veiga de Andrade
github: gabrielveigaaa
 
Backend desenvolvido com Node.js;
Frontend desenvolvido com React + Vite;

-PRÉ REQUISITOS:
    node.js instalado na máquina;
    npm;
    MySQL.

PASSO A PASSO:
1- clonar repositório https://github.com/gabrielveigaaa/Desafio-FullStack-COGNVOX.git   ;

2- ajustar dados do "backend\rotas\ .env" : 
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=desafio_fullstack
DB_PORT=3306
JWT_SECRET=chave_super_secreta

3- instalar dependencias na raiz do projeto : npm install

3.1-Agora instale as dependências do backend: cd backend
                                                npm install
                                                cd ..

4- Rodar a aplicação (frontend + backend juntos) usando o CURRENTLY: npm run full

5- Acessar no navegador

Frontend:

http://localhost:5173

Backend (API):

http://localhost:3001
