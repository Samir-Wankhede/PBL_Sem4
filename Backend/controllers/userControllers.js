import pg from "pg";
import bcrypt from "bcrypt";

 const saltrounds = 10;

///home
const getHome = (req,res)=>{

}
//sendregisterpage
const getRegister = (req,res)=>{
    try{
        res.staus(200);
    }catch(err){
        console.log(err);
    }
};

//sendloginpage
const getLogin = (req,res)=>{
    try{
        res.staus(200);
    }catch(err){
        console.log(err);
    }
};

//postlogin
const checkUser = (req,res)=>{

};

//postregister
const createUser = async (req,res)=>{
    const {name, email, reg_id, password, confirmation_password, gender} = req.body;
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
};

export {
    getHome,
    getRegister,
    getLogin,
    checkUser,
    createUser,
}