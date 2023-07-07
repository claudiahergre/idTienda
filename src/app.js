const express = require('express');

const app = express();

//necesitamos esto para que puedan entrar objetos de tipo json
app.use(express.json())

app.get('/', (rec, res) => {
    res.send('holigüis')
})
app.use('/api', require('./routes/api'))

module.exports = app;