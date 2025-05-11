const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'Calculadora_front')));
console.log(path.join(__dirname, 'Calculadora_front'));
app.get('/sum', (req, res)=>{
    const a = parseFloat(req.query.num1);
    const b = parseFloat(req.query.num2);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).json({ error: 'Both query parameters a and b must be valid numbers.' });
    }

    const result = a+b;
    res.json({ result });
});
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})