import mongoose from 'mongoose'
import dontenv from 'dotenv-safe'
dontenv.config()

mongoose.connect(process.env.MONGO_CONNECTION as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default mongoose