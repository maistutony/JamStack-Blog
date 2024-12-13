const mongoose= require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  timePublished: {
    type: Date,
    required: true,
  },
  description: String,
  imageUrl: String,

  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

postSchema.index({title:1,description:1,content:1 })
//create the athiBlog model instance then export it to routes folder
module.exports=mongoose.model("posts",postSchema);