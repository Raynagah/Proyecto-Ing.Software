const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

// Usar las rutas de API
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

