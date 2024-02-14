// user model define
interface User {
  email: string; // user name
  password: string;
}
// import mongoose
const mongoose = require("mongoose");
// user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Users = mongoose.models?.Users || mongoose.model("Users", userSchema);
export default Users;
