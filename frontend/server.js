const http= require('http');
const app=require('../backend/server')
const server=http.createServer(app)
const PORT=3000;
app.set('port',PORT)
server.listen(PORT)