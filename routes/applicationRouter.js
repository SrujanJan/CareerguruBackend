import express from "express";
import {jobseekerDeleteApplication,postApplication,jobseekerGetAllApplications,employerGetAllApplications} from "../controllers/applicationController.js"
import {isAuthorized} from "../middlewares/auth.js"
const router=express.Router();
router.get("/Employeer/getall",isAuthorized,employerGetAllApplications);
router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllApplications);
router.delete("/delete/:id",isAuthorized,jobseekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);

export default router;