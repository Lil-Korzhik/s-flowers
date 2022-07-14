import Content from "../models/contentModel.js";
import ApiError from "../exceptions/apiError.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Get Content
// @route   GET /api/content
// @access  Public
export const getContent = expressAsyncHandler(async (req, res) => {
    const content = await Content.find();
    res.json(content);
});

// @desc    Get Content By Key
// @route   GET /api/content/:key
// @access  Public
export const getContentByKey = expressAsyncHandler(async (req, res) => {
    const key = req.params.key;
    
    const content = await Content.findOne({key});
    if(!content) throw ApiError.BadRequest('Контент с таким key не существует');

    res.json(content);
});

// @desc    Create Content
// @route   POST /api/content
// @access  Public
export const createContent = expressAsyncHandler(async (req, res) => {
    const {key, value, title} = req.body;
    if(!key || !value || !title) throw ApiError.EmptyFields();

    const content = await Content.create({key, value, title});
    res.json(content);
});

// @desc    Update Content
// @route   PUT /api/content
// @access  Public
export const updateContent = expressAsyncHandler(async (req, res) => {
    const {key, value} = req.body;
    if(!key || !value) throw ApiError.EmptyFields();

    const content = await Content.findOne({key});
    if(!content) throw ApiError.BadRequest('Контент с таким ключем не найден');

    content.value = value;
    content.save();

    res.json(content);
});

// @desc    Delete Content
// @route   DELETE /api/content
// @access  Public
export const deleteContent = expressAsyncHandler(async (req, res) => {
    const {key} = req.body;
    if(!key) throw ApiError.EmptyFields();

    const content = await Content.findOne({key});
    if(!content) throw ApiError.BadRequest('Контент с таким ключем не найден');

    content.remove();    
    res.json(content);
});