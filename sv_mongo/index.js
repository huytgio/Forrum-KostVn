const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routers/auth')
const postRouter = require('./routers/post')
const cmtRouter = require('./routers/comment')
const dbaray_test = `mongodb+srv://nguyenqui19052000:123123123b@tieuluan.vhbhunp.mongodb.net/tieuluan?retryWrites=true&w=majority`
const dbaray_product = `mongodb+srv://huytgio147:147852as@letmeknow.vdxja2f.mongodb.net/LetmeKnow?retryWrites=true&w=majority`
// Connect to the database and set wide ACLs. This is called once per request
const connectDB = async () => {
    try {
        await mongoose.connect(dbaray_test,
            {

            })
        console.log('mongoDB connected')
    } catch (error) {
        console.log(error.message, "kết nối thất bại")
        process.exit(1)
    }
}
connectDB()

// Create and return a service application that will listen on port 5000. This is a bit tricky because we don't want to listen on port 5000 in a multi - process environment
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/comment', cmtRouter)

app.get('/', (req, res) => res.send('Đã kết nối thành công'))

const PORT = 5000
app.listen(PORT, () => console.log(`sv started on port ${PORT}`))