const express = require('express');
const app = express();
const collaboratorRouter = require('./src/routers/collaboratorRouter');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use('/collaborator', collaboratorRouter);

app.listen(process.env.PORT, () => {
  console.log('Servidor ligado');
})
