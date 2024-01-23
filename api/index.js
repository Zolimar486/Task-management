const express= require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors= require('cors')
const path = require("path")
const app = express();
dotenv.config()
app.use(cors());



//Imports of Routers
const authRouter = require('./routers/auth')
const userRouter= require('./routers/user')
const authGoogle= require('./routers/authGoogle')
const taskRouter = require('./routers/task')

// Conecting Mongodb
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Mongodb connected"))
.catch((err)=> console.log(err))

//Middleware functions
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended: true, limit:'50mb'}))
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authGoogle)
app.use('/api/task', taskRouter)

//Api Get Request to deploy server side


app.get('/', async(req,res) => {
  res.status(200).json({message :"Successfully Conected"})
})


//Customize Error
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Return  JSON response with an error message
  res.status(500).json({ error: 'Internal Server Error' });
});



const port = process.env.PORT;
app.listen(port, ()=> console.log(`The server is running on port :http://localhost:${port}`) )
