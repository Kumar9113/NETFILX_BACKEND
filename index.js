const express = require('express')
const app = express();
app.use(express.json());

const movieRoute = require("./routers/movies")
const authRoute = require("./routers/auth")
const userRouter = require("./routers/users")
const listRoute = require("./routers/list");

const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectionUrl = "mongodb+srv://Kumar:Kumar%409113@cluster0.xrhjxpn.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, configOptions).then(() => {
    console.log('db connecct')
}).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json(
        {
            status: 200,
            message: "welcome to page"

        }
    )
})



app.use("/api/auth", authRoute)
app.use("/api/users", userRouter);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(3000, () => {
    console.log("Server start");
})



