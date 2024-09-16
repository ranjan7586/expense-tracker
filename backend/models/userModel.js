import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcrypt';
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4(),
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 15);
    next();
})
const User = mongoose.model("User", userSchema);
export default User