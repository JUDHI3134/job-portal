import express from "express"
import { changeJobApplicationStatus, changeJobVisiblity, getCompantData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/register", upload.single('image') ,registerCompany)

router.post("/login",loginCompany)

router.get("/company", protectCompany ,getCompantData)

router.post("/post-job", protectCompany ,postJob)

router.get("/applicants", protectCompany ,getCompanyJobApplicants)

router.get("/list-job", protectCompany ,getCompanyPostedJobs)

router.post("/change-status", protectCompany ,changeJobApplicationStatus)

router.post("/change-visiblity", protectCompany ,changeJobVisiblity)


export default router;