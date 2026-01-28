import { model, Schema } from "mongoose";
import { IPostDocument } from "../../interfaces/db-interfaces/post.db.interface";

const postSchema = new Schema<IPostDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 5,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: 20,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    createdAt: {
      type: Date,
      degfault: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Post = model<IPostDocument>("Post", postSchema);
export default Post;
