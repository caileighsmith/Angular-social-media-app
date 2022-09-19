const http = require('http');
const app = require('./backend/app');
const debug = require("debug")("node-angular")


const port = 3000; //Trying to use the default port. If not set -- we use port 3000

app.set('port', port)
const server = http.createServer(app);


server.listen(port);