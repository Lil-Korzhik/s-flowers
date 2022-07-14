import mongoose from 'mongoose';

const contentSchema = mongoose.Schema({
    key: {type: String, required: true},
    value: {type: String, required: true},
    title: {type: String, required: true}
});

const Content = mongoose.model('Content', contentSchema);
export default Content;