const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    departamento: String,
    disponible: Boolean,
    stock: Number
}, { timestamps: true, versionKey: false })



module.exports = model('product', productSchema)// model me permite enlazar la coleccion en la base de datos con el esquema