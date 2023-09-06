const express=require('express')
const app=express();
app.use(express.json());

const movieRoute=require("./routers/movies")
const authRoute=require("./routers/auth")
const userRouter=require("./routers/users")
const listRoute = require("./routers/list");

const mongoose=require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
mongoose.connect('mongodb+srv://Kumar:Kumar%409113@cluster0.bprqnop.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1} 
).then(()=>
{
    console.log('db connecct')
}).catch(err=>console.log(err))



app.use("/api/auth",authRoute)
app.use("/api/users",userRouter);
app.use("/api/movies",movieRoute);
app.use("/api/lists", listRoute);

app.listen(3000,()=>
{
    console.log("Server start");
})



