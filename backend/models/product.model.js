import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{
    timestamps: true // created at and updated at
})

const Product = mongoose.model("Product",productSchema);

// mongoose will convert this Product to products

export default Product;