import expressAsyncHandler from 'express-async-handler';
import ApiError from '../../exceptions/apiError.js';
import Admin from '../../models/adminModel.js';

// @desc    Register User
// @route   POST /api/users/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const {name, login, password} = req.body;
    if(!name || !login || !password) throw ApiError.EmptyFields();

    const isExistsUser = await Admin.findOne({login});
    if(isExistsUser) {
        res.status(400);
        throw ApiError.BadRequest('Админ с таким логином уже существует.');
    }

    const user = await Admin.create({name, login, password});
    res.json(user);
});