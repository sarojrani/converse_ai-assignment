const DesignModel = require("../models/DesignModel");
const {isValid, isValidObjectId,isValidRequestBody} = require("../validation/validator")

  // const uploadFile= require("../aws/aws")
// 
 // const productPhoto = await uploadFile(files[0])


const createDesign = async (req,res) =>{
  try{

   
    const data=req.body;
    // const files = req.files;

    const {id, title, description,Model, userId,price,tags }=data
    
    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "Please provide data to create Design" })
  }
  if (!isValid(id)) {
    return res.status(400).send({ status: false, message: "Please provide product id" })
}
  if (!isValid(title)) {
    return res.status(400).send({ status: false, message: "please provide product's title" })
}
if (!isValid(description)) {
    return res.status(400).send({ status: false, message: "Please provide products's descriptions" })
}
if(!isValidObjectId(userId)){
  return res.status(400).send({status:false,message:"userid is incorrect"})
}
if (!isValid(price)) {
    return res.status(400).send({ status: false, message: "Please provide products's price" })
}
if (!isValid(tags)) {
  return res.status(400).send({ status: false, message: "Please provide products's tags" })
}

// const ModelPhoto = await uploadFile(files[0])

// const modelData={
//   id:id,
//   userId:userId,
//   title:title,
//   description:description,
//  price:price,
//  tags:tags,
//  Model:ModelPhoto
// }
    
    const saveData=await DesignModel.create(data)
  return res.status(201).send({status:true,data:saveData})
  } 
  catch(err){
    return res.status(500).send({status:false,msg:err.msg})
  }
}

const getDesign= async (req,res)=> {
  try{
  const data= await DesignModel.find()
  return res.status(200).send({data:data})
  }
  catch(err){
    return res.status(500).send({status:false,msg:err.msg})
  }

}
const updateDesign= async (req,res) => {
  try{
    const DesignId=req.params.DesignId;

    if(!isValidObjectId(DesignId)){
      return res.status(400).send({status:false,message:"DesignId is incorrect"})
  }

    const {tags,title,discription}=req.body;
    if (!isValidRequestBody(req.body)) {
      return res.status(400).send({ status: false, message: "Please provide data to create Design" })
  }

    const saveData= await DesignModel.findOneAndUpdate({_id:DesignId},{ $push:{tags:tags},$set:{ title,discription}},{new:true})

    return res.status(200).send({data:saveData})
  }
  catch(err){
    return res.status(500).send({status:false,msg:err.msg})
  }
}
const DeleteDesign= async (req,res) =>{
  const DesignId = req.params.DesignId;

  if(!isValidObjectId(DesignId)){
    return res.status(400).send({status:false,message:"DesignId is incorrect"})
}

const DesignDelete= await DesignModel.findOneAndDelete({_id:DesignId},{$set:{isDeleted:true}},{new:true})

if (!DesignDelete) { return res.status(404).send({ msg: "Already deleted" }) }

res.status(200).send({ msg: "Deleted" })
}

module.exports={createDesign,getDesign,updateDesign,DeleteDesign}