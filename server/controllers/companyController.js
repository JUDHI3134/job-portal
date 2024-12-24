import Company from "../models/Company.js";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

//company register
export const registerCompany = async (req, res) =>{
    const {name, email, password} = req.body;

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile){
        return res.json({success: false, message:"Missing Details"})
    }

    try {
       
        const companyExist = await Company.findOne({email})

        if(companyExist){
            return res.json({success: false, message:"Company Already Registered.."}) 
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company:{
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//company login--------------------------------------------------------------------
export const loginCompany = async (req, res) =>{
    try {
        const {email, password} = req.body;
      
        const company = await Company.findOne({email})

        if(await bcrypt.compare(password, company.password)){
            res.json({
                success: true,
                company:{
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }else{
            res.json({success: false, message: "Invalid Email and Password"}) 
        }
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//get conpany data-------------------------------------------------------------------
export const getCompantData = async (req, res) =>{
    try {
        const company = req.company;
      res.json({success: true, company})  
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//post a new job------------------------------------------------------------
export const postJob = async (req, res) =>{
    const {title, description, location, salary,level, category} = req.body;

    const companyId = req.company._id
    
    try {
      const newJob = new Job({
        title,
        description,
        location,
        salary,
        companyId,
        date: Date.now(),
        level,
        category
      })
      
      await newJob.save();

      res.json({success: true, newJob})
      
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//get company job applicants----------------------------------------------
export const getCompanyJobApplicants = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//get company posted job-------------------------------------------------------
export const getCompanyPostedJobs = async (req, res) =>{
    try {
       const companyId = req.company._id;
       
       const jobs = await Job.find({companyId})

       //todo Adding no. of applicants in to the data

       res.json({success: true, jobsData: jobs})
       
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//change Job Application Status--------------------------------------------------
export const changeJobApplicationStatus = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//change Job Visiblity--------------------------------------------------------------
export const changeJobVisiblity = async (req, res) =>{
    try {
      
        const {id} = req.body;

        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        res.json({success: true, job})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}