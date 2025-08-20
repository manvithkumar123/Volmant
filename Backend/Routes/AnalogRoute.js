const express = require('express')
const router=express.Router();
const Analogschema=require("../Databases/AnalogModule");

router.post("/create",(req,res)=>{
    let {watchname,ImageUrl,Rupee,Dollar,Euro,specification,gender}=req.body;
    try{const newanalog= new Analogschema({
        watchname,
        ImageUrl,
        Rupee,
        Dollar,
        Euro,
        specification,
        gender
    })
    newanalog.save();
    res.send("done")
    } catch(error){
        res.status(400).json({error:"unknown error occured in saving analog"})
    }
})

router.get("/view", async (req, res) => {
    try {
        const analogscollection = await Analogschema.find();
        res.json(analogscollection);
    } catch (error) {
        res.status(500).json({ error: "unknown error occured in viewing analog" });
    }
});

router.post("/deleteall",async(req,res)=>{
    try{
        const deleteall = await Analogschema.deleteMany({})
        res.send("Deleted Sucessfully")
    }
    catch(error){
        res.status(400).json({ error: "unknown error occured in deletingall analog"}); 
    }
})

router.post("/deleteid",async(req,res)=>{
    try{
        let{deletebyid}=req.body;
        const deletesingle=await Analogschema.findByIdAndDelete(deletebyid);
        res.send("deleted")
    }catch(error){
        res.status(400).send({error:"unknown error occured in deleting specific analog"})
    }
})
router.post("/edit", async (req, res) => {
    try {
        const { edit_id } = req.body;

        const analog = await Analogschema.findById(edit_id);
        if (!analog) {
            return res.status(404).send({ error: "Analog not found" });
        }

        const fields = ["watchname", "ImageUrl", "Rupee", "Dollar", "Euro", "specification", "gender"];
        fields.forEach((key) => {
            if (req.body[key] !== undefined) {
                analog[key] = req.body[key];
            }
        });

        await analog.save();
        res.send("Updated Successfully");
    } catch (error) {
        res.status(400).send({ error: "unknown error occurred in editing analog" });
    }
});
router.get("/view/:id", async (req, res) => {
    try {
        const analog = await Analogschema.findById(req.params.id);
        if (!analog) {
            return res.status(404).json({ error: "Analog not found" });
        }
        res.json(analog);
    } catch (error) {
        res.status(500).json({ error: "Unknown error occurred in viewing analog by ID" });
    }
});
module.exports=router;