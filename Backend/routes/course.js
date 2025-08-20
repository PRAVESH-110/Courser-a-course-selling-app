const Router=require("express");
const {userMiddleware}=require("../middlewares/usermdleware")
const { purchaseModel, courseModel } = require("../db");
const courseRouter=Router();
    

    courseRouter.post('/purchase',userMiddleware,async function(req,res){
        const userId=req.userId;
        const courseId= req.body.courseId;

        //should check that the user has actually purchased 
        await purchaseModel.create({
            userId:userId,
            courseId:courseId
        }) 
        res.json({
            message:"purchase successfull"
        })
    })

    courseRouter.get('/preview',async function(req,res){ 
        const courses=await courseModel.find({});
        res.json({
            message:"your courses",
            courses
        })
    })

module.exports={
    courseRouter:courseRouter
}
