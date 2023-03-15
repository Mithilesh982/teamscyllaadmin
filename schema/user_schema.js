import mongoose from "mongoose";

import autoIncrement from "mongoose-auto-increment"

mongoose.set('strictQuery', true)

const userschema = mongoose.Schema({
    id: String,
    userName: String,
    userEmail : String,
    userPhone : String,
    userMessage : String
})

autoIncrement.initialize(mongoose.connection);
userschema.plugin(autoIncrement.plugin,"teamscylla_user")

const user = mongoose.model("teamscylla_user",userschema )

export default user;
