import expressAsyncHandler from 'express-async-handler';
import ApiError from '../../exceptions/apiError.js';
import Admin from '../../models/adminModel.js';

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
export const loginUser = expressAsyncHandler(async (req, res) => {
    const {login, password} = req.body;
    if(!login || !password) throw ApiError.EmptyFields();

    const user = await Admin.findOne({login, password});
    if(!user) {
        throw ApiError.UnauthorizedError('Неправильный E-Mail или пароль');
    }

    res.json(user);
});