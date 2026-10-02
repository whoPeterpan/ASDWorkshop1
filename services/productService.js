const database = require("../database/productDatabase");

async function getAllProducts() {
    return await database.readData();
}

async function getProductById(id) {
    const products = await database.readData();

    return products.find((product) => product.id === id);
}

async function createProduct(data) {
    const products = await database.readData();

    const newProduct = {
        id: products.length + 1,
        name: data.name,
        price: data.price
    };

    products.push(newProduct);

    await database.writeData(products);

    return newProduct;
}

async function updateProduct(id, data) {
    const products = await database.readData();

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data,
        id: id
    };

    await database.writeData(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await database.readData();

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await database.writeData(products);

    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};