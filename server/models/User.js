import mongoose from "mongoose";


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
    },
    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });
export default mongoose.model("User", User);

