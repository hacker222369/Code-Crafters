import { Request, Response } from "express";
import Canteen from "../models/canteen";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const getMyCanteen=async(req:Request,res:Response)=>{
  try{
    const canteen=await Canteen.findOne({user:req.userId});
    if(!canteen){
      return res.status(404).json({message:"Canteen not found!"})
    }
    res.json(canteen);
  }
  catch(error){
    console.log("error",error);
    res.status(500).json({message:"Error fetching canteen"});
  }
}



const createMyCanteen = async (req: Request, res: Response) => {
  try {
    const existingCanteen = await Canteen.findOne({ user: req.userId });

    if (existingCanteen) {
      return res
        .status(409)
        .json({ message: "Canteen already exists" });
    }

    // const image = req.file as Express.Multer.File;
    // const base64Image=Buffer.from(image.buffer).toString("base64");
    // const dataURI=`data:${image.mimetype};base64,${base64Image}`;
    // const uploadResponse=await cloudinary.v2.uploader.upload(dataURI);
    const imageUrl=await uploadImage(req.file as Express.Multer.File)
    const canteen=new Canteen(req.body);
    canteen.imageUrl=imageUrl;
    canteen.user=new mongoose.Types.ObjectId(req.userId);
    canteen.lastUpdated=new Date();

    await canteen.save();
    res.status(201).send(canteen);
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyCanteen=async(req:Request,res:Response)=>{
  try{
    const canteen=await Canteen.findOne({
      user:req.userId,
    })
    if(!canteen){
      return res.status(404).json({message:"Canteen not found"})

    }
    canteen.canteenName=req.body.canteenName;
    canteen.cuisines=req.body.cuisines;
    canteen.menuItems=req.body.menuItems;
    canteen.lastUpdated=new Date();
    if(req.file){
      const imageUrl=await uploadImage(req.file as Express.Multer.File);
      canteen.imageUrl=imageUrl;
    }
    await canteen.save();
    res.status(200).send(canteen);
  }catch(error){
    console.log("error",error);
    res.status(500).json({message:"Something went Wrong"});
  }
}

const uploadImage=async(file:Express.Multer.File)=>{
  const image = file;
    const base64Image=Buffer.from(image.buffer).toString("base64");
    const dataURI=`data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse=await cloudinary.v2.uploader.upload(dataURI);

    return uploadResponse.url;
}


export default{
    getMyCanteen,
    createMyCanteen,
    updateMyCanteen,
};


