import Company from "../models/Company.js";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js";

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

//company login
export const loginCompany = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//get conpany data
export const getCompantData = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//post a new job
export const postJob = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//get company job applicants
export const getCompanyJobApplicants = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//get company posted job
export const getCompanyPostedJobs = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//change Job Application Status
export const changeJobApplicationStatus = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

//change Job Visiblity
export const changeJobVisiblity = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}