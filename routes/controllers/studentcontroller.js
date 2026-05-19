import e from "express";
import Student from "../../models/student.js";
import { isAdmin } from "./userController.js";

export function getAllStudents(req, res){
        Student.find().then(
            (students) => {
                console.log(students)
                res.json(students)
            }
        )
    }

export function createStudent(req, res){
    console.log(req.user)
   if (isAdmin(req)){
    const student = new Student(req.body)
        student.save().then(
            () => {
            res.json({message: "Student created successfully"}) 
            }
        )

   }else{
    res.status(403).json({message: "You need to login as admin to create a student"})
   }
       
}