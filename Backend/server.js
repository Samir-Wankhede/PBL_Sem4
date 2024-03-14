import express from "express";
import bodyParser from "body-parser";
import Routes from "./routes/routers.js";
import pg from "pg";
import env from "dotenv";

env.config();
const app = express();


//middlewares
app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/api",Routes);

//dbConnection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
  db.connect()
  .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Connected to DB and listening on port ${process.env.PORT}`);
        })
    })
    .catch((err)=>{
        console.log(err);
    });
