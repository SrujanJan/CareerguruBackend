import express from "express";
import {updateJob,getAllJobs,getmyJobs,postJob, deleteJob, getSinglejob} from "../controllers/jobController.js"
// import {} from "../middlewares/auth.js"
import { isAuthorized } from "../middlewares/auth.js";
const router=express.Router();
router.get("/getall",getAllJobs);
router.post("/post",isAuthorized,postJob);
router.get("/getmyjobs",isAuthorized,getmyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deleteJob);
router.get("/:id",isAuthorized,getSinglejob);
export default router;