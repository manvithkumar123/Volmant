const express = require("express");
const router = express.Router();
const SmartSchema=require("../Databases/SmartModule");

router.post("/create",async(req,res)=>{
   try { let {watchname,ImageUrl,Rupee,Dollar,Euro,specification,gender}=req.body;
    const createSW= await SmartSchema({
        watchname,
        ImageUrl,
        Rupee,
        Dollar,
        Euro,
        specification,
        gender,
    })
    await createSW.save();
    res.send("created Sucessfully")
    }catch(error){
        res.status(400).send({error:"an error occured while creating"})
    }
})

router.get("/view",async(req,res)=>{
    try{const viewSW=await SmartSchema.find();
    res.json(viewSW)
    }catch(error){
        res.status(400).send({error:"an error occured while viewing"})
    }
})
router.post("/deleteall",async(req,res)=>{
    try{
        await SmartSchema.deleteMany({});
        res.send("Sucessfully deleted_all")
    }catch(error){
        res.status(400).send({error:"an error occured while deleting all"})
    }
})
router.post("/deleteid",async(req,res)=>{
    try{let {deletebyid}=req.body;
    const Delete_ID= await SmartSchema.findByIdAndDelete(deletebyid);
    res.send("deleted")
    }catch(error){
        res.status(400).send({error:"an error occured"})
    }
})

router.post("/edit",async(req,res)=>{
    let {edit_id }=req.body
    const editSW = await SmartSchema.findById(edit_id);
    if(!editSW){
        res.status(404).send("id not found")
    }
    try {let updatefield = ["watchname", "ImageUrl", "Rupee", "Dollar", "Euro", "specification", "gender"]
    
    updatefield.forEach((key)=>{
        if(req.body !== undefined){
            editSW[key]=req.body[key];
        }
    })
    await editSW.save();
    res.send("updated")
    } catch(error){
        res.status(404).send({error:"data is not updated "})
    }
})
router.get("/view/:id", async (req, res) => {
    try {
        const smart = await SmartSchema.findById(req.params.id);
        if (!smart) {
            return res.status(404).json({ error: "digital not found" });
        }
        res.json(smart);
    } catch (error) {
        res.status(500).json({ error: "Unknown error occurred in viewing analog by ID" });
    }
});
module.exports=router;