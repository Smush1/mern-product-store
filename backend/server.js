import express from 'express';

import { connectDB } from './db.js';
import { config } from 'dotenv';

import productRoutes from './routes/product.route.js'


config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Listening to the port: ${PORT}`);
})
});





app.get('/', (req, res)=>{
    res.send('HEllo this is homepage');
})

