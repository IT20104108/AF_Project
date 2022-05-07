const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


//import routers
const studentgroupRoutes = require('./routes/SS_routes/studentgroups');
const adminRouter = require('./routes/RG_routes/admin');

//app middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//routes use
app.use(studentgroupRoutes);
app.use("/admin",adminRouter);

const PORT = process.env.PORT || 8070;

app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(cors());

const URL = process.env.MONGODB_URL;
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

mongoose.connect(URL, {

    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
console.log("Mongodb connection success!!!");

})

// @import routes
const studentgroupRouter = require("./routes/SS_routes/studentgroups");
const studentRouter = require("./routes/AA_routes/student");
const staffRouter =require("./routes/SS_routes/staff");
const researchTopicRouter = require("./routes/SS_routes/researchtopic");

// rotues
app.use("/group",studentgroupRouter);
app.use("/student", studentRouter);
app.use("/staff",staffRouter);
app.use("/topic",researchTopicRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
