import User from "../DB/models/user/user.model";
import { IUser } from "../interfaces/db-interfaces/user.db.interface";
import { AppError } from "../utils/error-handling/app-error";

interface UpdateUser {
  id: string;
  updatedData: Partial<IUser>;
}

export class UserService {
  static async create(userData: IUser): Promise<IUser> {
    if (userData.email) {
      const userExist = await User.findOne({ email: userData.email });
      if (userExist) throw new AppError("Email already exists", 400);
    }

    const user = await User.create(userData);
    return user.toObject();
  } 

  static async findAll(): Promise<IUser[]> {
    return await User.find().lean();
  }

  static async findById(id: string): Promise<IUser> {
    const user = await User.findById(id).lean();
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async update({ id, updatedData }: UpdateUser): Promise<IUser> {
    if (updatedData.email) {
      const userExist = await User.findOne({
        email: updatedData.email,
        _id: { $ne: id },
      });
      if (userExist) throw new AppError("Email already exists", 400);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
      lean: true,
    });

    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async remove(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new AppError("User not found", 404);
  }
}
