const Category = require("../models/category.model");
const Product = require("../models/product.model");


const createProduct = async (reqData) => {

    let topLavel = await Category.findOne({ name: reqData.topLavelCategory });
    // console.log(topLavel);
    if (topLavel == null) {
        // console.log(1);
        topLavel = new Category({ name: reqData.topLavelCategory, level: 1 })
        console.log(topLavel);
        await topLavel.save();
    }
    let secondLavel = await Category.findOne({ name: reqData.secondLavelCategory, parentCategory: topLavel._id });
    if (secondLavel == null) {
        secondLavel = new Category({ name: reqData.secondLavelCategory, parentCategory: topLavel._id, level: 2 });
        await secondLavel.save();
    }
    let thirdLavel = await Category.findOne({ name: reqData.thirdLavelCategory, parentCategory: secondLavel._id });
    if (thirdLavel == null) {
        console.log(2);
        thirdLavel = new Category({ name: reqData.thirdLavelCategory, parentCategory: secondLavel._id, level: 3 });
        await thirdLavel.save();
    }
    // console.log(thirdLavel._id);
    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        color: reqData.color,
        discountedPrice: reqData.discountedPrice,
        discountedPersent: reqData.discountedPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirdLavel._id
    })
    return await product.save();
}

const deleteProduct = async (productId) => {
    const product = await findProductById(productId)
    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

const updateProduct = async (productId, reqData) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
    updatedProduct.discountPersent = ((updateProduct.price - updateProduct.discountedPrice) * 100) / updatedProduct.price
    return updatedProduct
}

const findProductById = async (productId) => {
    const product = await Product.findById(productId).populate('category').exec();
    if (!product) {
        throw new Error("Product not found with id:" + productId)
    }
    return product
}

const getAllProducts = async (reqQuery) => {
    let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;
    if (pageSize < 10) {
        pageSize = 10;       
    }
    if (pageNumber <= 0) {
        pageNumber = 1;
    }

    // console.log("server");

    let query = Product.find().populate("category");  
   
    
    if (category && category !== '') {
        console.log("cat",category);
        const existCategory = await Category.findOne({ name: category });
        if (existCategory) {
            // console.log("exist");
            query = query.where("category").equals(existCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }

    if (color && color.length > 0) {
        console.log("color");
        const colorSet = new Set(color.split(',').map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex);
    }

    if (sizes && sizes.length > 0) {
        console.log("sizes");
        const sizeSet = new Set(sizes.split(',').map(sizes => sizes.trim().toLowerCase()));
        const sizesRegex = sizeSet.size > 0 ? new RegExp([...sizeSet].join("|"), "i") : null;
        query = query.where("sizes.name").regex(sizesRegex);
    }

    if (minPrice > 0 && maxPrice > 0) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount > 0) {
        // console.log("dis");
        query = query.where("discountPersent").gte(minDiscount);
    }

    if (stock && stock !== '') {
        console.log("stock");
        const stockSet = new Set(stock.split(',').map(stock => stock.trim().toLowerCase()));
        if (stockSet.has("in stock")) {
            query = query.where("quantity").gt(0);
        }
        if (stockSet.has("out of stock")) {
            query = query.where("quantity").lte(0);
        }
    }

    if (sort) {
        console.log("sort");
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }


    const totalProducts = await Product.countDocuments(query);
    console.log("Total products:", totalProducts);
    console.log(totalProducts);
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);
    console.log(products);
    return { content: products, currentPage: pageNumber, totalPages };
};


const createMultipleProduct = async (products) => {
    for (let product of products) {
        await createProduct(product);
    }
}

module.exports = { createProduct, deleteProduct, updateProduct, getAllProducts, findProductById, createMultipleProduct }