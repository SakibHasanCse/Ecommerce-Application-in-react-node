
import mongoose from 'mongoose';
const CategorySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim:true,
        maxlength:32,
        unique: true
    }
    
}, { timestamps: true })




const CategoryModel = mongoose.model('Category', CategorySchema)
export default CategoryModel