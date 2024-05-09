import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minLength: [3, "name must contain atleast 3 characters"],
    maxLength: [30, "name must contain more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: [validator.isEmail, "please provide valid email"],
  },
  phone: {
    type: Number,
    required: [true, "please provide your email"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minLength: [8, "password must contain atleast 8 characters"],
    maxLength: [32, "password must not exceed 32 character"],
    select:false,
  },
  role: {
    type: String,
    required: [true, "please provide your role"],
    enum: ["Job Seeker", "Employeer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Hashing the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }this.password=await bcrypt.hash(this.password,10);
})
userSchema.methods.comparePassword=async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
};
// generating a jwt  token for authorization
userSchema.methods.getJWTToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRE,
  })
};
export const User=mongoose.model("User",userSchema);