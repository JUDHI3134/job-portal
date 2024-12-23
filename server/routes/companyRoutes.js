import express from "express"
import { changeJobApplicationStatus, changeJobVisiblity, getCompantData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";


const router = express.Router();

router.post("/register", upload.single('image') ,registerCompany)

router.post("/login",loginCompany)

router.get("/company",getCompantData)

router.post("/post-job",postJob)

router.get("/applicants",getCompanyJobApplicants)

router.get("/list-job",getCompanyPostedJobs)

router.post("/change-status",changeJobApplicationStatus)

router.post("/change-visiblity",changeJobVisiblity)


export default router;