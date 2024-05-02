import mongoose from "mongoose";

const {Schema} = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {timestamps: true});

// 如果实例存在则不重新创建
export default mongoose.models.Post || mongoose.model("Post", PostSchema);