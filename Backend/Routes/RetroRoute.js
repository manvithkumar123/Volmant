const express = require("express")
const router = express.Router()
const RetroModule = require("../Databases/RetroModule");


router.post("/create",async(req,res)=>{
   try{ let {watchname,ImageUrl,Rupee,Dollar,Euro,specification,gender}=req.body;
    const createDigital = new DigitalSchema({
        watchname,
        ImageUrl,
        Rupee,
        Dollar,
        Euro,
        specification,
        gender,
    })
    await createDigital.save()
    res.send("done")
    }catch(error){
        res.status(400).send({error:"unknown error occured in saving digital"})
    }
})

router.get("/view", async (req,res)=>{
    try{
        const retro = await RetroModule.find();
        res.json(retro);
    } catch(error){
        res.status(400).send({error:"unknown error occured in viewing digital"})
    }
})
router.post("/edit",async(req,res)=>{
    try{
        const {edit_id}= req.body;
        const digital = await DigitalSchema.findById(edit_id)
        if(!digital){
            res.status(400).send("error occured check whether id is present")
        }
        const updatedFields = ["watchname", "ImageUrl", "Rupee", "Dollar", "Euro", "specification", "gender"];
        updatedFields.forEach((key) => {
            if (req.body[key] !== undefined) {
                digital[key] = req.body[key];
            }
        });
        await digital.save()
        res.send("sucessful")
    }catch(error){
        res.status(404).send({error:"error occured"})
    }
})
router.post("/deleteall",async(req,res)=>{
   try{ await DigitalSchema.deleteMany({});
    res.send("Deleted")
    }catch(error){
        res.status(404).send({error:"an error occured wile deleting all"})
    }
})
router.post("/deleteid",async(req,res)=>{
    try{let {deletebyid}=req.body;
    const deleteid = await DigitalSchema.findByIdAndDelete(deletebyid)
    res.send("Deleted")
    } catch(error){
        res.status(400).send({error:"an error occured while deleting selected id"})
    }
})
router.get("/view/:id", async (req, res) => {
    try {
        const retro = await RetroModule.findById(req.params.id);
        if (!retro) {
            return res.status(404).json({ error: "digital not found" });
        }
        res.json(retro);
    } catch (error) {
        res.status(500).json({ error: "Unknown error occurred in viewing analog by ID" });
    }
});
module.exports=router;