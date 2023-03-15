const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routers/auth')
const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://huytgio147:147852Huytgio@letmeknow.vdxja2f.mongodb.net/LetmeKnow?retryWrites=true&w=majority`,
        {
            
        })
        console.log('mongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

const app = express()
app.use(express.json())

app.use('/api/auth',authRouter)

app.get('/',(req,res) => res.send('cmmdmm'))

const PORT = 5000
app.listen(PORT, ()=> console.log(`sv started on port ${PORT}`))