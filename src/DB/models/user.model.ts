import { model, Schema } from "mongoose";
import {
  IUserDocument,
  UserRoles,
} from "../../interfaces/db-interfaces/user.db.interface";

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    age: { type: Number, required: false, min: 18, max: 100 },
    role: { type: String, enum: UserRoles, default: UserRoles.USER },
  },
  { timestamps: true },
);

const User = model<IUserDocument>("User", userSchema);
export default User;
