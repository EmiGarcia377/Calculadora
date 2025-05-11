const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'Calculadora_front')));
console.log(path.join(__dirname, 'Calculadora_front'));

// Función reutilizable para manejar operaciones matemáticas
const handleOperation = (req, res, operation) => {
    const a = parseFloat(req.query.num1);
    const b = parseFloat(req.query.num2);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Ambos parametros de la operacion deben ser numeros validos.' });
    }

    let result;
    switch (operation) {
        case 'sum':
            result = a + b;
            break;
        case 'rest':
            result = a - b;
            break;
        case 'mult':
            result = a * b;
            break;
        case 'div':
            if (b === 0) {
                return res.status(400).json({ error: 'La division entre 0 invalida.' });
            }
            result = a / b;
            break;
        default:
            return res.status(400).json({ error: 'operacion invalida.' });
    }

    res.json({ result });
};

// Rutas para las operaciones
app.get('/sum', (req, res) => handleOperation(req, res, 'sum'));
app.get('/rest', (req, res) => handleOperation(req, res, 'rest'));
app.get('/mult', (req, res) => handleOperation(req, res, 'mult'));
app.get('/div', (req, res) => handleOperation(req, res, 'div'));

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});