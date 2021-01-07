import mongoose from "mongoose"
import slugify from "slug"
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 40
    },
    slug: { type: String },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true,
     
    },
    quntity: { type: Number },
    sold: { type: Number ,default:0},
    photo: {
        data: Buffer,
        ContentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }
}, { timestamps: true })

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name)
    next()
})

const product = mongoose.model('product', productSchema)
export default product