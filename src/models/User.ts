import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
}, {timestamps: true});

// 如果实例存在则不重新创建
export default mongoose.models.User || mongoose.model("User", userSchema);