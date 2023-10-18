// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const emplooyeModel = require("./model/emplooyeModel");
// const app = express();

// app.use(cors());
// app.use((req, res, next) => {
//     console.log('Request received:', req.body);
//     next();
//   });
//   app.use(express.json());
// const port = 7575;

// mongoose
//   .connect("mongodb://127.0.0.1:27017/TASKS")
//   .then(() => {
//     console.log("DB is connected Successfully!!!");
//   });

// app.get("/", async (req, res) => {
//   res.send("API is connected!!!");
// });

// // Read all employees
// app.get("/emp", async (req, res) => {
//   const result = await emplooyeModel.find({});
//   res.send(result);
// });

// // Create a new employee
// app.post("/addemp", async (req, res) => {
//   console.log("check emp", req.body);
//   const payload = req.body;
//   const newEmp = new emplooyeModel(payload);
//   await newEmp.save();
//   res.send("Employee is Added!!!");
// });

// // Delete an employee by empid
// app.post("/delemp", async (req, res) => {
//   const payload = req.body;
//   await emplooyeModel.findOneAndDelete(payload);
//   res.send("Employee deleted Successfully");
// });

// // Update an employee by empid
// app.put("/updemp/:empid", async (req, res) => {
//   const empid = req.params.empid;
//   const updatedData = req.body;

//   try {
//     const result = await emplooyeModel.findOneAndUpdate(
//       { empid: empid },
//       updatedData,
//       { new: true }
//     );
//     res.send("Employee updated Successfully");
//   } catch (error) {
//     res.status(500).send("Error updating employee");
//   }
// });

// app.listen(port, () => {
//   console.log(`Port is connected on ${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const emplooyeModel = require("./model/emplooyeModel");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 7575;

mongoose.connect("mongodb://127.0.0.1:27017/TASKS").then(() => {
  console.log("DB is connected Successfully!!!");
});
app.get("/", async (req, res) => {
  res.send("Api is connected!!!");
});
app.get("/emp", async (req, res) => {
  const result = await emplooyeModel.find({});
  res.send(result);
});

app.post("/addemp", async (req, res) => {
  console.log("Received payload:", req.body);
  try {
    const payload = req.body;
    const newEmp = new emplooyeModel(payload);

    // Validate data
    if (
      !payload.fname ||
      !payload.lname ||
      !payload.email ||
      !payload.mobile ||
      !payload.city
    ) {
      return res.status(400).send("All fields are required");
    }

    await newEmp.save();
    res.status(201).send("Employee is Added!!!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
// delete employee
app.delete("/delemp/:id", async (req, res) => {
  
  try {
    const employeeId = req.params.id;
    const result = await emplooyeModel.findByIdAndDelete(employeeId);

    if (!result) {
      return res.status(404).send("Employee not found");
    }

    res.send("Employee deleted successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.post("/delemp", async (req, res) => {
//   const payload = req.body;
//   await emplooyeModel.findOneAndDelete(payload);
//   res.send("Emplooye deleted Successfully");
// });


// update api 
app.put("/updateemp/:id", async (req, res) => {
  console.log("check body",req.body);
  console.log("check id",req.params.id);
  try {
    const employeeId = req.params.id;
    const updatedData = req.body;
    const result = await emplooyeModel.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Employee not found");
    }

    res.send("Employee updated successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(port, () => {
  console.log(`Port is connected on ${port}`);
});
