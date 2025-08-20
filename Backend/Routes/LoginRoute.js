const express=require('express');
const router=express.Router();
const loginSchema=require("../Databases/LoginModule")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cookie=require("cookie-parser")
const islogged = require("../Middlewares/isLogged");

router.post("/signup", async (req, res) => {
  const { Username, Password,Phonenumber } = req.body;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(Password, salt, async (err, hash) => {
        const newUser = await loginSchema.create({ Username, Password: hash });
        const token = jwt.sign({ username: Username, userid: newUser._id }, "manvith");
        res.cookie("token", token);
        res.status(201).json({ message: "User created successfully" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create user" });
  }
});

router.post("/login",async(req,res)=>{
  let {Username,Password}=req.body;

  if(Username==="Manvith"&&Password==="project3"){
    const token = jwt.sign({ username: Username, role: "admin" }, "manvith",);
    res.cookie("token", token);
    return res.json({adminlogin:true})
  }
  let enteredUsername = await loginSchema.findOne({Username})
  if (!enteredUsername) return res.status(404).json({ message: "An error occured check username and password" });
  const isMatch = await bcrypt.compare(Password, enteredUsername.Password);
  if (isMatch) {
    const token = jwt.sign(
      { username: Username, userid: enteredUsername._id, role: "user" }, 
      "manvith"
    );
    res.cookie("token", token);
    res.status(200).json("login Sucessful");
  } else {
    res.status(401).json({ message: "An error occured check username and password" });
  }
})
router.get("/logout",(req,res)=>{
  res.cookie('token',"");
  res.redirect("/")
})
router.get("/userlist",async(req,res)=>{
    try{
        let userlist= await loginSchema.find();
        res.json(userlist);
    }
    catch(error){
        res.send({error:"unable to fetch data"})
    }
})
router.post("/deleteid",async(req,res)=>{
  let{id_user}=req.body;
  let deletinguser = await loginSchema.findByIdAndDelete(id_user);
  if (!deletinguser) return res.status(404).json({ message: "User not found" });
  else res.status(200).json({ message: "User deleted successfully" });
})
router.post("/deleteall",async(req,res)=>{
    try {await loginSchema.deleteMany({})
    res.status(201).json({ message: "deleted sucessfully" });
    }
    catch(error){res.send({error:"unable to delete all users"})}
})

router.get('/check-auth',(req,res)=>{
  const token =req.cookies.token;
  if(!token){
    return res.json({ loggedIn: false });
  }
  try {
    const decoded = jwt.verify(token, "manvith"); // secret should match login/signup
    res.json({
      loggedIn: true,
      username: decoded.username,
      user: decoded,
      isAdmin: decoded.role === "admin"
    });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});
module.exports = router;