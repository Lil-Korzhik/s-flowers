import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import ApiError from '../exceptions/apiError.js';
import User from '../models/userModel.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
    if(req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) throw ApiError.BadRequest('Token пустой');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if(user) {
            req.user = user;
            next();
        } else {
            throw ApiError.UnauthorizedError('Token не валиден');
        }
    } else {
        throw ApiError.BadRequest('Authorization пустой');
    }
});