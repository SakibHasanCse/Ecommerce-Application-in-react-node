
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';
import mongoose from 'mongoose';
const CategorySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim:true,
        maxlength:32
    }
    
}, { timestamps: true })




const CategoryModel = mongoose.model('Category', CategorySchema)
export default CategoryModel