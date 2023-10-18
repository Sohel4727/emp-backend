// const mongoose=require("mongoose");

// const emplooyeModel=mongoose.model("newemp",
// {
//     empid:{type:Number},
//     fname:{type:String},
//     lname:{type:String},
//     email:{type:String},
//     mobile:{type:Number},
//     city:{type:String},
// })

// module.exports=emplooyeModel;

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empid: { type: String },
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  mobile: { type: String },
  city: { type: String },
});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;
