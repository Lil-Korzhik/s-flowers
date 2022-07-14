import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;