import mongoose, { Types } from "mongoose";


export interface IUserCreate {
  name: string,
  email: string,
  password: string,
  dob: number,
}
export interface IUser extends IUserCreate {
  _id: Types.ObjectId,
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, maxLength: 50, minlength: 3 },
  email: { type: String, unique: true, maxLength: 50, minlength: 3 },
  password: { type: String, required: true, maxLength: 100, minlength: 5 },
  dob: { type: Number, required: true },
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;