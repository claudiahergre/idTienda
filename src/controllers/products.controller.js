const Product = require('../models/products.model');

const getProductos = async (req, res) => {
    try {
        const productos = await Product.find(); //al poner el punto sale la magia de todas las funciones precocinadas que tienes, para encontrar, borrar, modificar...
        res.json(productos)
    } catch (error) {
        console.log(error.message)
    }

}

const postProducto = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
        res.json(error.message)
    }
}

const getById = async (req, res) => {
    try {
        const { productId } = req.params
        const producto = await Product.findById(productId);
        res.json(producto)
    } catch (error) {
        res.json(error.message)
    }
}

const putProducto = async (req, res) => {
    try {
        const { productId } = req.params
        const productoModificado = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(productoModificado)
    } catch (error) {
        res.json(error.message)
    }
}

const deleteProducto = async (req, res) => {
    try {
        const { productId } = req.params
        const productoBorrado = await Product.findByIdAndDelete(productId);
        res.json(productoBorrado)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    getProductos, postProducto, getById, putProducto, deleteProducto
}