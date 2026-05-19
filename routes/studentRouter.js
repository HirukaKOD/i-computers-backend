import express from "express";
import { createStudent, getAllStudents } from "./controllers/studentcontroller.js";


const studentRouter = express.Router()

studentRouter.get("/", getAllStudents)

studentRouter.post("/", createStudent)

export default studentRouter;   
 