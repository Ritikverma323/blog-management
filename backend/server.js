const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/blogsmanagement";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    },
    (err) => {
      /** handle initial connection error */
    }
  );
const Posts = require("./models/postsModel");
const posts = [
  {
    _id: 1,
    title: "products",
    content: "products description",
  },
];
app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
app.get("/posts", (req, res) => {
  Posts.find({}).then((postdata) => {
    console.log(postdata);
    res.status(200).json({ message: "posts", posts: postdata });
    console.log(`Server is running on port ${PORT}`);
  });
});

app.post("/posts", (req, res) => {
  const Post = new Posts({
    title: req.body.title,
    content: req.body.content,
  });
  Post.save();
  console.log(Post);
  res.status(201).json({ message: "Post Added" });
});

app.delete("/delete-posts/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Posts.deleteOne({ _id: id }).then((result) => {
    console.log(result);
    res.status(201).json({ message: "Post Deleted" });
  });
});
app.listen(PORT);
module.exports = app;
