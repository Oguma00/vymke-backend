const authRoutes=require ("./routes/auth")
const postRoutes=require("./routes/post")
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors")
console.log("awosome");
const app = express();
const PORT =process.env.PORT || 5005;
app.use(cors())
app.use(express.json())
// app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
      console.log(`server is running at port ${PORT} and DB is connected`)
    )
    .catch((err) => console.log(err));
});
app.get("/", (req, res) => {
  res.send("my-vymke API");
});
dotenv.config(

)