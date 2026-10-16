import express from 'express';
import path from 'path'

import { connectDB } from './db.js';
import { config } from 'dotenv';

import productRoutes from './routes/product.route.js'


const __dirname = path.resolve()

config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("/{*splat}", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

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
