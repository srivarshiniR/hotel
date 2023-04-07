const express=require('express')
const router=express.Router();

const roomModel=require('../model/room')

router.get("/getrooms",async(req,res)=>{

    try{
        const rooms= await roomModel.find({})
        return res.json({rooms});
     }
     catch(error){
    return res.status(400).json({message:error});

    }
});



router.get("/getroombyid/:roomid",async(req,res)=>{

    const roomid = req.params.roomid
    
    try{
        const room= await roomModel.findOne({"_id":roomid});
        return res.send({room});
     }
     catch(error){
        console.log(error)
    return res.status(400).json({message:error});

    }
});







module.exports=router