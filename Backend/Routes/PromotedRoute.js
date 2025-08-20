const PromoteSchema = require("../Databases/Promotemodule");
const express = require("express");
const router= express.Router()

router.post("/add",async(req,res)=>{
    let {watchname,Rupee,Dollar,Euro,ImageUrl} = req.body;
    try{    
        let newpromote = new PromoteSchema({
        watchname,
        Rupee,
        Dollar,
        Euro,
        ImageUrl,
        });
        await newpromote.save();
        res.status(200).send("Item added successfully");
        
    }
    catch{
        res.status(500).send("Error in adding item");
    }
})

router.post("/delete",async(req,res)=>{
    let {user_id}=req.body;
    try{
        await PromoteSchema.findByIdAndDelete(user_id);
        res.status(200).send("Item deleted successfully");
    }catch{
        res.status(500).send("Error in deleting item");
    }
})

router.get("/view",async(req,res)=>{
    try{
        promotedlist = await PromoteSchema.find({})
        res.json(promotedlist);
    }
    catch{
        res.status(500).send("Error in fetching promoted items");
    }
})
router.get("/view/:id",async(req,res)=>{
    try{
        let item = await PromoteSchema.findById(req.params.id)
        res.json(item);
    }
    catch{
        res.status(500).send("Error in fetching promoted item by ID");
    }
})


module.exports=router;