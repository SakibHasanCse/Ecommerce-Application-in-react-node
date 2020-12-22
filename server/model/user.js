
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    about: {
        type: String,
        trim:true
    },
    salt:String,
    role:{
        type: String,
        default: 'user'
    },
    history:{
        type:Array,
        default:[]
    }
}, { timestamps: true })


UserSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.cryptoPassword(password) 
    })
    .get(function(){
        return this._password
    });

UserSchema.methods ={
    authenticate:function(plainText){
        return this.cryptoPassword(plainText) === this.hashed_password ;

    },
    cryptoPassword:function(password){
        if(!password) return  '' ;
        try { 
            return crypto
                    .createHmac("sha1", this.salt)
                    .update(password)
                    .digest('hex')
        } catch (error) {
            return ''
        }

    }
};

const UserModel = mongoose.model('User', UserSchema)
export default UserModel