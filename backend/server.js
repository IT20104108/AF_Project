const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


//app middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8070;

app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(cors());

//To accept the JSON Data
app.use(express.json());

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
const staffRouter =require("./routes/SS_routes/staff");
const PDFUploadRouter = require('./routes/SS_routes/PDFUpload');
const studentRouter = require("./routes/AA_routes/student");
const topicRouter = require("./routes/IS_routes/topic");
const DocUploadRouter = require("./routes/IS_routes/DocUpload");
const adminRouter = require('./routes/RG_routes/admin');
const createmarkingRouter = require('./routes/RG_routes/createmarking');
const usersremoveRoutes = require('./routes/RG_routes/usersremove');
const presantationpdfuploadRoutes = require('./routes/RG_routes/presantationpdf');

// rotues use
app.use("/group",studentgroupRouter);
app.use("/student", studentRouter);
app.use("/staff",staffRouter);
app.use("/regtopic",topicRouter);
app.use("/document",DocUploadRouter);
app.use("/admin",adminRouter);
app.use("/createmarking",createmarkingRouter);
app.use("/usersremove",usersremoveRoutes);
app.use("/presantationpdf",presantationpdfuploadRoutes);
app.use("/assignment",PDFUploadRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
