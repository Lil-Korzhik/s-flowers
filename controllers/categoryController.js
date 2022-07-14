import Category from "../models/categoryModel.js";
import ApiError from "../exceptions/apiError.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Get All Categories
// @route   GET /api/category
// @access  Public
export const getCategories = expressAsyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// @desc    Create Category
// @route   POST /api/category
// @access  Public
export const createCategory = expressAsyncHandler(async (req, res) => {
    const {name} = req.body;
    if(!name) throw ApiError.EmptyFields();

    const isExists = await Category.findOne({name});
    if(isExists) throw ApiError.BadRequest('Категория с таким именем уже существует');

    const category = await Category.create({name});
    res.json(category);
});

// @desc    Update Category
// @route   POST /api/category
// @access  Public
export const updateCategory = expressAsyncHandler(async (req, res) => {
    const {categoryId} = req.body;
    if(!categoryId) throw ApiError.EmptyFields();

    const category = await Category.findById(categoryId);
    if(!category) throw ApiError.BadRequest('Категория с таким ID не найдена');

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {new: true});
    res.json(updatedCategory);
});

// @desc    Delete Category
// @route   DELETE /api/category
// @access  Public
export const deleteCategory = expressAsyncHandler(async (req, res) => {
    const {categoryId} = req.body;
    if(!categoryId) throw ApiError.EmptyFields();

    const category = await Category.findById(categoryId);
    if(!category) throw ApiError.BadRequest('Категория с таким ID не найдена');

    category.remove();
    res.json(category);
});