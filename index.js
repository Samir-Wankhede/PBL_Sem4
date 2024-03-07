import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";
import env from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const saltrounds = 10;
env.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

app.get("/register",(req,res)=>{
    try{
        res.sendFile(__dirname+"/public/views/register.html");
    }catch(err){
        console.log(err);
    }
});

app.get("/login",(req,res)=>{
    try{
        res.sendFile(__dirname+"/public/views/login.html");
    }catch(err){
        console.log(err);
    }
});

app.post("/login",(req,res)=>{

});

app.post("/register",async (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const reg_id = req.body.reg_id;
    const password = req.body.password;
    const confirmation_password = req.body.confirmed_password;
    const gender = req.body.gender;
    if (password!==confirmation_password){
        console.log(password,confirmation_password);
        //alert("Password doesn't match confirmation")
        res.redirect("/register");
    }else{
        try{
            const if_present = await db.query("SELECT * FROM student WHERE email = $1",[email]);
            if (if_present.rows.length>0){
                res.redirect("/login");
            }else{
                bcrypt.hash(password,saltrounds,async (err,hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("ok");
                        await db.query("INSERT INTO student (name,email,reg_id,gender) VALUES ($1,$2,$3,$4)",[name,email,reg_id,gender]);
                        console.log("ok2");
                        await db.query("INSERT INTO student_password(id,password) VALUES ($1,$2)",[reg_id,hash]);
                        res.redirect("/login");
                    }
                });
            }
        }catch(err){
            console.log(err)
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });