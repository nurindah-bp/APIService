const express = require('express')
const app = express()
const port = 3000
const { connectDB } = require('./services/db');

const AuthRoute = require("./routes/auth.js");
const ProjectRoute = require("./routes/project.js");
const TaskRoute = require("./routes/task.js");
const EmployeeRoute = require("./routes/employee.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors()); 

app.use("/auth", AuthRoute);
app.use("/project", ProjectRoute);
app.use("/task", TaskRoute);
app.use("/employee",EmployeeRoute);

(async () => {
  try {
    await connectDB();
    app.listen(port, function () {
      console.log(`Listening to Port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})(); 