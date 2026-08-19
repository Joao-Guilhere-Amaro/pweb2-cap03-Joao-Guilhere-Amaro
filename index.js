// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):
//
// import http from 'node:http';
//
// const PORT = process.env.PORT || 3000;
//
// const server = http.createServer((req, res) => {
//   // dica: use req.method, req.url e req.headers para decidir a resposta
// });
//
// server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
import http from 'node:http';
import { url } from 'node:inspector';
import path from 'node:path';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if(req.method === "GET" && req.url ==="/"){
       
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end('Olá, Mundo!');
        return;
    }
    if(req.method === "GET" && req.url ==="/sobre"){
        res.writeHead(200, { "Content-Type": "text/html" }); 
        res.end('<h1>Sobre</h1>'); 
        return;
    }
    if(req.method === "GET" && req.url.startsWith('/saudacao/')){
        const partes = req.url.split('/');
        const nome = partes[2];
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end(`Olá, ${nome}!`);
        return;
    }
    if(req.method === "POST" && req.url === "/echo"){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end(body);
        });
        return;
    }
    if(req.method === "PUT" && req.url.startsWith('/itens/')){
        const parte = req.url.split('/');
        const id = parte[2];
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end(`Item ${id} atualizado`);
        return;
    }
    if(req.method === "DELETE" && req.url.startsWith('/itens/')){
        const parte = req.url.split('/');
        const id = parte[2];
        res.writeHead(204);
        res.end();
        return;
    }
    if(req.method === "PATCH" && req.url === "/config"){
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Configuração atualizada')
        return;
    }
    if(req.method === "HEAD" && req.url === "/status"){
        res.writeHead(200, {'X-Status': 'ok'});
        res.end();
        return;
    }
   
    if(req.method === "GET" && req.url === "/agente"){
        const agente = req.headers['user-agent'] || '';
        if(agente.toLowerCase().includes('curl')){
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Você é o cURL');
        }
        else if(agente.toLowerCase().includes('chrome')){
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Você é um navegador');
        } else{
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Agente desconhecido');
        }
        return;
    }
    if(req.method === "GET" && req.url === "/secreto"){
        const senha = req.headers['x-senha'];
        if(senha === "1234"){
            res.writeHead(200,{
                'content-type': 'text/plain'
            });
            res.end('Acesso liberado');
        }else{
            res.writeHead(401, {
                'content-type': 'text/plain'
            });
            res.end('Não autorizado');
        }
        return;
    }
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Rota não encontrada');
});
server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));