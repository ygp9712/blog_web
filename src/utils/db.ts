import mongoose from "mongoose";


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
      } catch (error) {
        console.log('连接数据库异常', error)
        throw new Error('连接数据库异常')
        // handleError(error);
      }
}


export default connect