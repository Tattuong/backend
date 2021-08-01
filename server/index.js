require('dotenv').config() //bien moi truong
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')  
const path = require('path')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const flash = require('req-flash')



const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodemg.co1bo.mongodb.net/nodeMg?retryWrites=true&w=majority`,{
            useCreateIndex : true, 
            useNewUrlParser : true,
            useUnifiedTopology : true,                          
            useFindAndModify  : false
     })

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()


const app = express()
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json())
app.use(cors())

app.use(morgan('combined'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');





app.use('/', authRouter)
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use(flash())


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
