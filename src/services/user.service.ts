import User from "../DB/models/user.model";
import { IUser } from "../interfaces/db-interfaces/user.db.interface";

interface UpdateUser {
  id: string;
  updatedData: Partial<IUser>;
}
export class UserService {

  static async create(userData: IUser) {
    const user = new User(userData);
    return await user.save();
  }

  static async findAll() {
    return await User.find();
  }
  static async findById(id: string) {
    return await User.findById(id);
  }

  static async update({ id, updatedData }: UpdateUser) {
    return await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  }

  static async remove(id: string) {
    return await User.findByIdAndDelete(id);
  }
}
