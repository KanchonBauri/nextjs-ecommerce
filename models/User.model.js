import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    avatar: {
        type: String,
        trim: true
    },
    public_id:{
        type: String,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
   deleted: {
    type: Boolean, // ✅ boolean type
    default: false,
    index: true
}

}, { timestamps: true });


userSchema.pre('save', async function (next) {
if (!this.isModified('password')) 
    return next();
this.password = await bcrypt.hash(this.password, 10);
next();
})

userSchema.methods = {
    comparePassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
}

const UserModel = mongoose.models.User || mongoose.model('User', userSchema , 'users')
export default UserModel;