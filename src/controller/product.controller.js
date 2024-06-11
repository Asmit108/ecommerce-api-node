const productService = require('../services/product.service')

const createProduct = async (req, res) => {
    try {
        const createdProduct = await productService.createProduct(req.body)
        return res.status(200).send(createdProduct)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const message = await productService.deleteProduct(req.params.id)
        return res.status(200).send(message)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body)
        console.log(updatedProduct.price)
        return res.status(200).send(updatedProduct)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const findProductById = async (req, res) => {
    try {
        const product = await productService.findProductById(req.params.id)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query)
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const createMultipleProduct = async (req, res) => {
    try {
        const createdProducts = await productService.createMultipleProduct(req.body)
        return res.status(200).send({ message: "products created successfully" })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { createProduct, deleteProduct, updateProduct, getAllProducts, createMultipleProduct, findProductById }
