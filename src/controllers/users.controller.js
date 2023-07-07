const User = require('../models/users.model');


const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('products'); // .populate para relacionar el product asociado. (relaciones SENCILLAS 1:1). Para todo lo demás, MySQL
        res.json(users)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}


const postUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}

const buyProduct = async (req, res) => {
    try {
        const { userId, productId } = req.params

        const userProducts = await User.findById(userId);
        userProducts.products.push(productId)
        await userProducts.save()

        res.json(userProducts)

    } catch (error) {
        res.json({ fatal: error.message })
    }
}


module.exports = {
    postUser, buyProduct, getUsers
}