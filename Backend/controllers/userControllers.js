import pg from "pg";
import bcrypt from "bcrypt";
import {db} from "../server.js";

 const saltrounds = 10;


//postlogin
const checkUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const result = await db.query("SELECT sp.* FROM student_password sp JOIN student s ON sp.id = s.reg_id WHERE s.email = $1", [
          email,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword,(err,yes_or_no)=>{
            if (err){
              console.log("ERROR IN COMPARE");
            }else{
              if (yes_or_no) {
                res.status(200).json({message:"welcome!",redirect:"/student"});
                //console.log("ok");
              } else {
                res.status(401).json({message:"incorrect password",redirect:"/login"});
              }
            }
          });
        } else {
            res.status(400).json({message:"user does not exist",redirect:"/register"});
        }
      } catch (err) {
        console.log(err);
      }
};

//postregister
const createUser = async (req,res)=>{
    const {name, email, reg_id, password, confirmation_password, gender} = req.body;
    if (password!== confirmation_password){
        return res.status(401).json({message:"Password and Confirmation doesn't match",redirect:"/register"})
    }
        try{
            const if_present = await db.query("SELECT * FROM student WHERE email = $1",[email]);
            if (if_present.rows.length>0){
                return res.status(200).json({message: "User already present",redirect: "/login"})
            }else{
                bcrypt.hash(password,saltrounds,async (err,hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        //console.log("ok");
                        await db.query("INSERT INTO student (name,email,reg_id,gender) VALUES ($1,$2,$3,$4)",[name,email,reg_id,gender]);
                        //console.log("ok2");
                        await db.query("INSERT INTO student_password(id,password) VALUES ($1,$2)",[reg_id,hash]);
                        return res.status(200).json({message: "User now present",redirect: "/student"})
                    }
                });
            }
        }catch(err){
            console.log(err)
        }
        //console.log({name, email, reg_id, password, confirmation_password, gender});
};

export {
    checkUser,
    createUser,
}