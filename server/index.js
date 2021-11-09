require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

const port = process.env.PORT || 4000;
const authRouter = require("./routes/authRouter");

server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
  res.send("<h1>TEST API</h1>");
});
server.listen(port, () => {
  console.log(`\n\n SERVER IS RUNNING ON PORT:${port} \n\n`);
});

/*
require('dotenv').config();

const express = require('express');
const upload = require("./utils/multer");
const {cloudinary} = require("./utils/cloudinary");
const { all } = require('async');

const app = express();






app.set('view engine', 'ejs');
app.use(express.json({limit: "50m"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));

app.get('/api/upload', async (req, res, next)=>{
    // SINGLE IMAGE 
    // const single_image = await cloudinary.api.resources();
    // console.log(single_image.resources[0].public_id);


    // const single_image = await cloudinary.api.resource("yqxprxoayhnhjtdmnpsi");
    // console.log(single_image);
    // https://cloudinary.com/documentation/admin_api#get_resources
    const all_image = await cloudinary.api.resources();
    console.log(all_image);
    const images = await all_image.resources;
    console.log(images);

res.render('index', {images});
});

app.post('/api/upload', upload.single('img') , async (req, res, next)=>{


    console.log("file details: ", req.file);

    // cloudinary.v2.uploader.upload(file, options, callback);
    const result = await cloudinary.uploader.upload(req.file.path);


    console.log("result: ", result);


    const post_details = {
        title: req.body.title,
        image: result.public_id
    }

    res.status(200).json({post_details});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('Server is running on : ' + port));
*/