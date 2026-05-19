import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type : String,
        unique : true,
        required : true
    },
    firstName: {
        type : String,
        required : true,
    },
    lastName: {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true,
    },
    isAdmin: {
        type : Boolean,
        default : false,
    },
    isblocked: {
        type : Boolean,
         required : true,
        default : false,
    },
    isEmailVerified: {
        type : Boolean,
        required : true,
        default : false,
    },
    Image: {
        type : String,
        required : true,
        default :"/images/default-profile.png",
    }
    
})
const User = mongoose.model("User", userSchema);
export default User;
