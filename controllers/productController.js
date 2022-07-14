import expressAsyncHandler from 'express-async-handler';
import ApiError from '../exceptions/apiError.js';
import Product from '../models/productModel.js';
import fileService from '../services/fileService.js';

// @desc    Get All Products
// @route   GET /api/products
// @access  Public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// @desc    Get Product By Id
// @route   GET /api/products:id
// @access  Public
export const getProductById = expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    if(productId.length !== 24) throw ApiError.BadRequest('ID должен быть длиной в 24 символа');

    const product = await Product.findById(productId);
    if(!product) throw ApiError.BadRequest('Продукт с таким ID не существует');

    res.json(product);
});

// @desc    Create Product
// @route   POST /api/products
// @access  Public
export const createProduct = expressAsyncHandler(async (req, res) => {
    const files = req.files;
    if(files == null) throw ApiError.BadRequest('Файлы не переданы');
    if(!files.image) throw ApiError.BadRequest('Картинка поста не передана.');
    const image = files.image;

    const {title, description, price} = req.body;
    if(!title || !description || !price) throw ApiError.EmptyFields();

    const imageName = fileService.saveFile(image, 'products');
    const newProduct = await Product.create({title, description, price, image: imageName});
    res.json(newProduct);
});

// @desc    Update Product
// @route   UPDATE /api/products
// @access  Public
export const updateProduct = expressAsyncHandler(async (req, res) => {
    const files = req.files;
    const body = req.body;

    const {productId} = req.body;
    if(!productId) throw ApiError.EmptyFields();

    let isImage = false;
    if(files != null) {
        if(files.image) isImage = true;
    }

    const product = await Product.findById(productId);
    if(!product) throw ApiError.BadRequest('Продукт с таким ID не существует');

    const updatedProduct = await Product.findByIdAndUpdate(productId, body, {new: true});
    
    if(isImage) {
        const imageName = fileService.saveFile(files.image, 'products');
        fileService.removeFile(updatedProduct.image, 'products');

        updatedProduct.image = imageName;
        await updatedProduct.save();
    } else {
        delete body.picture;
    }

    res.json(updatedProduct);
});

// @desc    Delete Product
// @route   DELETE /api/products
// @access  Public
export const deleteProduct = expressAsyncHandler(async (req, res) => {
    const {productId} = req.body;
    if(!productId) throw ApiError.EmptyFields();

    const product = await Product.findById(productId);
    if(!product) throw ApiError.BadRequest('Продукт с таким ID не существует');

    product.remove();
    fileService.removeFile(product.image, 'products');

    res.json(product);
});